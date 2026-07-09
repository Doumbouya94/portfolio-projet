import { useState, useEffect, useCallback } from 'react';
import { useSocket } from './useSocket.js';
import { EVENTS } from '../utils/socketEvents.js';

export function useChat(username, room) {
    const socket = useSocket();
    const [messages, setMessages]     = useState([]);
    const [users, setUsers]           = useState([]);
    const [typing, setTyping]         = useState('');
    const [connected, setConnected]   = useState(false);

    useEffect(() => {
        if (!username || !room) return;

        // Connecter et rejoindre la room
        if (!socket.connected) socket.connect();

        socket.emit(EVENTS.JOIN_ROOM, { username, room });
        setConnected(true);

        // Écouter les événements
        const onMessage = (msg) => setMessages(prev => [...prev, msg]);
        const onUsers   = (list) => setUsers(list);
        const onTyping  = ({ username: u }) => {
            setTyping(`${u} est en train d'écrire...`);
        };
        const onStopTyping = () => setTyping('');

        socket.on(EVENTS.RECEIVE_MESSAGE,  onMessage);
        socket.on(EVENTS.ROOM_USERS,       onUsers);
        socket.on(EVENTS.USER_TYPING,      onTyping);
        socket.on(EVENTS.USER_STOP_TYPING, onStopTyping);

        return () => {
            socket.off(EVENTS.RECEIVE_MESSAGE,  onMessage);
            socket.off(EVENTS.ROOM_USERS,       onUsers);
            socket.off(EVENTS.USER_TYPING,      onTyping);
            socket.off(EVENTS.USER_STOP_TYPING, onStopTyping);
        };
    }, [socket, username, room]);

    const sendMessage = useCallback((message) => {
        if (!message.trim()) return;
        socket.emit(EVENTS.SEND_MESSAGE, {
            room,
            author:  username,
            message: message.trim(),
            time:    new Date().toLocaleTimeString('fr-FR', {
                hour: '2-digit', minute: '2-digit',
            }),
        });
    }, [socket, username, room]);

    const emitTyping     = useCallback(() => socket.emit(EVENTS.TYPING,      { username, room }), [socket, username, room]);
    const emitStopTyping = useCallback(() => socket.emit(EVENTS.STOP_TYPING, { room }),           [socket, room]);

    const leaveRoom = useCallback(() => {
        socket.emit(EVENTS.LEAVE_ROOM, { username, room });
        setMessages([]);
        setUsers([]);
        setConnected(false);
    }, [socket, username, room]);

    return { messages, users, typing, connected, sendMessage, emitTyping, emitStopTyping, leaveRoom };
}