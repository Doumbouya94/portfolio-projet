import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useSocket } from '../hooks/useSocket.js';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export default function Admin() {
    const { token, logout } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [incomingCall, setIncomingCall] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [activeRoom, setActiveRoom] = useState('Recrutement');
    const [rooms, setRooms] = useState([]);
    const chatEndRef = useRef(null);
    const joinedRef = useRef(false);
    const navigate = useNavigate();
    const socket = useSocket();

    const fetchMessages = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/contact/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setMessages(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Socket.IO events
    useEffect(() => {
        if (!socket) return;
        if (joinedRef.current) return;
        joinedRef.current = true;

        const onIncomingCall = () => setIncomingCall(true);
        socket.on('incoming-video-call', onIncomingCall);

        const onRoomsList = (roomsList) => setRooms(roomsList);
        socket.on('rooms_list', onRoomsList);

        const onMessage = (msg) => {
            setChatMessages(prev => [...prev, msg]);
        };
        socket.on('receive_message', onMessage);

        socket.emit('join_room', { username: 'Admin', room: 'Recrutement' });

        return () => {
            socket.off('incoming-video-call', onIncomingCall);
            socket.off('rooms_list', onRoomsList);
            socket.off('receive_message', onMessage);
            socket.emit('leave_room', { username: 'Admin', room: activeRoom });
            joinedRef.current = false;
        };
    }, [socket]);

    // Auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const changeRoom = (newRoom) => {
        if (!socket || newRoom === activeRoom) return;
        socket.emit('leave_room', { username: 'Admin', room: activeRoom });
        setChatMessages([]);
        setActiveRoom(newRoom);
        socket.emit('join_room', { username: 'Admin', room: newRoom });
    };

    const sendMessage = () => {
        if (!chatInput.trim()) return;
        const msg = {
            author: 'Admin',
            message: chatInput,
            room: activeRoom,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        };
        socket.emit('send_message', msg);
        setChatInput('');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🛡️</span>
                        <h1 className="text-lg font-bold text-white">Dashboard Admin</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">← Portfolio</a>
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                            Déconnexion
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">

                {incomingCall && (
                    <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl animate-pulse">📹</span>
                            <div>
                                <p className="text-white font-semibold">Appel vidéo entrant !</p>
                                <p className="text-zinc-400 text-sm">Un visiteur souhaite vous appeler</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => { setIncomingCall(false); window.location.href = '/?videocall=true'; }} className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                                ✅ Répondre
                            </button>
                            <button onClick={() => setIncomingCall(false)} className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                                ✕ Ignorer
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '📧', label: 'Messages reçus', value: messages.length, color: 'text-violet-400' },
                        { icon: '📹', label: 'Appels vidéo', value: incomingCall ? '1 en attente' : '0', color: 'text-green-400' },
                        { icon: '👥', label: 'Connectés', value: rooms.reduce((acc, r) => acc + r.count, 0), color: 'text-blue-400' },
                    ].map(stat => (
                        <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Live Chat */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-96">
                        <div className="px-4 py-3 border-b border-zinc-800">
                            <h2 className="font-bold text-white text-lg mb-2">💬 Live Chat</h2>
                            <div className="flex gap-2">
                                {rooms.map(room => (
                                    <button
                                        key={room.name}
                                        onClick={() => changeRoom(room.name)}
                                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                            activeRoom === room.name
                                                ? 'bg-violet-600 text-white'
                                                : 'bg-zinc-800 text-zinc-400 hover:text-white'
                                        }`}
                                    >
                                        {room.name} ({room.count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.author === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${
                                        msg.system ? 'bg-zinc-800 text-zinc-400 text-center text-xs w-full' :
                                            msg.author === 'Admin' ? 'bg-violet-600 text-white' :
                                                'bg-zinc-800 text-zinc-100'
                                    }`}>
                                        {!msg.system && <p className="text-xs opacity-60 mb-1">{msg.author}</p>}
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-3 border-t border-zinc-800 flex gap-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                placeholder="Répondre en tant qu'Admin..."
                                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                                ➤
                            </button>
                        </div>
                    </div>

                    {/* Messages de contact */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-96 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-white text-lg">📧 Messages de contact</h2>
                            <button onClick={fetchMessages} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                                🔄 Actualiser
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {loading ? (
                                <div className="text-center py-10 text-zinc-500">
                                    <p>Chargement...</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-10 text-zinc-500">
                                    <div className="text-3xl mb-2">📭</div>
                                    <p>Aucun message pour l'instant</p>
                                </div>
                            ) : (
                                messages.map(msg => (
                                    <div key={msg.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-400 font-bold text-xs">
                                                    {msg.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-xs">{msg.name}</p>
                                                    <p className="text-xs text-violet-400">{msg.email}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-zinc-500">
                                                {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-300">{msg.message}</p>
                                        <a href={`mailto:${msg.email}`} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                                            → Répondre
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}