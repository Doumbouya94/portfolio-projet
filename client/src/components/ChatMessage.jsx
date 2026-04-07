export default function ChatMessage({ msg, username }) {
    const isOwn = msg.author === username;

    if (msg.system) {
        return (
            <div className="flex justify-center my-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
          {msg.message}
        </span>
            </div>
        );
    }

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`max-w-xs lg:max-w-md ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                {!isOwn && (
                    <span className="text-xs text-violet-400 font-semibold mb-1 ml-1">{msg.author}</span>
                )}
                <div className={`px-4 py-2 rounded-2xl text-sm ${
                    isOwn
                        ? 'bg-violet-600 text-white rounded-br-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm'
                }`}>
                    <p>{msg.message}</p>
                    <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-xs ${isOwn ? 'text-violet-200' : 'text-zinc-400'}`}>{msg.time}</span>
                        {isOwn && <span className="text-xs text-violet-200">✓✓</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}