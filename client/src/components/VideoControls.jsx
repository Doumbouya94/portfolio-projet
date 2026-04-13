export default function VideoControls({ audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onHangup }) {
    return (
        <div className="flex items-center justify-center gap-4 p-4 bg-zinc-900 border-t border-zinc-700">

            {/* Micro */}
            <button
                onClick={onToggleAudio}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    audioEnabled
                        ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={audioEnabled ? 'Couper le micro' : 'Activer le micro'}
            >
                {audioEnabled ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c.57-.08 1.12-.24 1.64-.46L19.73 21 21 19.73 4.27 3z"/>
                    </svg>
                )}
            </button>

            {/* Caméra */}
            <button
                onClick={onToggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    videoEnabled
                        ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={videoEnabled ? 'Couper la caméra' : 'Activer la caméra'}
            >
                {videoEnabled ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M21 6.5l-4-4-8 8-2-2L3.5 12 7 15.5l-4 4L4.5 21l4-4L12 21l9.5-9.5L19 9l2-2.5zm-10 10L7.5 13l8-8L19 8.5l-8 8z"/>
                    </svg>
                )}
            </button>

            {/* Raccrocher */}
            <button
                onClick={onHangup}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                title="Raccrocher"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
            </button>

        </div>
    );
}