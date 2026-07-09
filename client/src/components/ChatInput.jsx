import { useState, useRef } from 'react';

export default function ChatInput({ onSend, onTyping, onStopTyping }) {
    const [message, setMessage] = useState('');
    const typingTimeout = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);
        onTyping();
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(onStopTyping, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSend(message);
        setMessage('');
        onStopTyping();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-zinc-200 dark:border-zinc-700">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Écrire un message..."
                maxLength={500}
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
                type="submit"
                disabled={!message.trim()}
                className="w-9 h-9 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        </form>
    );
}