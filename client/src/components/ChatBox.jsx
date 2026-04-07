import { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat.js';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';

export default function ChatBox() {
    const [isOpen, setIsOpen]       = useState(false);
    const [username, setUsername]   = useState('');
    const [hasJoined, setHasJoined] = useState(false);
    const [tempName, setTempName]   = useState('');
    const messagesEndRef            = useRef(null);

    const ROOM = 'Recrutement';

    const { messages, users, typing, sendMessage, emitTyping, emitStopTyping, leaveRoom } =
        useChat(hasJoined ? username : null, hasJoined ? ROOM : null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleJoin = (e) => {
        e.preventDefault();
        if (!tempName.trim()) return;
        setUsername(tempName.trim());
        setHasJoined(true);
    };

    const handleLeave = () => {
        leaveRoom();
        setHasJoined(false);
        setUsername('');
        setTempName('');
    };

    return (
        <>
            {/* Bouton flottant */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-lg shadow-violet-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Chat avec moi"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                )}
                {/* Badge utilisateurs connectés */}
                {users.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
            {users.length}
          </span>
                )}
            </button>

            {/* Fenêtre chat */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl shadow-zinc-900/20 flex flex-col overflow-hidden transition-all duration-300">

                    {/* Header */}
                    <div className="bg-violet-600 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-400">
                                <img src="/avatar.jpeg" alt="Aboubacar" className="w-full h-full object-cover object-top" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Aboubacar</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-violet-200 text-xs">
                    {users.length > 0 ? `${users.length} connecté${users.length > 1 ? 's' : ''}` : 'En ligne'}
                  </span>
                                </div>
                            </div>
                        </div>
                        {hasJoined && (
                            <button onClick={handleLeave} className="text-violet-200 hover:text-white text-xs transition-colors">
                                Quitter
                            </button>
                        )}
                    </div>

                    {/* Contenu */}
                    {!hasJoined ? (
                        // Formulaire de connexion
                        <form onSubmit={handleJoin} className="p-6 space-y-4">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                                Bonjour 👋 Je suis disponible pour discuter. Entrez votre nom pour commencer !
                            </p>
                            <input
                                type="text"
                                value={tempName}
                                onChange={e => setTempName(e.target.value)}
                                placeholder="Votre nom..."
                                maxLength={20}
                                autoFocus
                                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!tempName.trim()}
                                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                            >
                                Commencer la discussion →
                            </button>
                        </form>
                    ) : (
                        // Zone de chat
                        <>
                            <div className="flex-1 overflow-y-auto p-3 space-y-1 max-h-72">
                                {messages.length === 0 && (
                                    <div className="text-center py-8 text-zinc-400 text-sm">
                                        <p>👋 Aucun message pour l'instant</p>
                                        <p className="text-xs mt-1">Soyez le premier à écrire !</p>
                                    </div>
                                )}
                                {messages.map((msg, index) => (
                                    <ChatMessage key={index} msg={msg} username={username} />
                                ))}
                                {typing && (
                                    <p className="text-xs text-zinc-400 italic px-2">{typing}</p>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <ChatInput
                                onSend={sendMessage}
                                onTyping={emitTyping}
                                onStopTyping={emitStopTyping}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
}