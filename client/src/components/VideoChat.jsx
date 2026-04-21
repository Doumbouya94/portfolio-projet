import { useState, useEffect, useRef, useCallback } from 'react';
import { useMedia } from '../hooks/useMedia.js';
import { useWebRTC } from '../hooks/useWebRTC.js';
import { useSocket } from '../hooks/useSocket.js';
import VideoControls from './VideoControls.jsx';

export default function VideoChat() {
    const [isOpen, setIsOpen]             = useState(false);
    const [callState, setCallState]       = useState('idle');
    const [remoteStream, setRemoteStream] = useState(null);
    const [remoteUser, setRemoteUser]     = useState(null);

    const localVideoRef  = useRef(null);
    const remoteVideoRef = useRef(null);

    const socket = useSocket();

    const { localStream, audioEnabled, videoEnabled, error, startMedia, toggleAudio, toggleVideo, stopMedia } = useMedia();

    const handleRemoteStream = useCallback((stream) => {
        setRemoteStream(stream);
        setCallState('inCall');
    }, []);

    const handleCallEnded = useCallback(() => {
        setCallState('idle');
        setRemoteStream(null);
        setRemoteUser(null);
        stopMedia();
    }, [stopMedia]);

    const { createPeerConnection, handleAnswer, handleIceCandidate, closeConnection } = useWebRTC({
        socket,
        localStream,
        onRemoteStream: handleRemoteStream,
        onCallEnded: handleCallEnded,
    });

    // Attacher le flux local à la vidéo
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    // Attacher le flux distant à la vidéo
    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    // Démarrer automatiquement si ?videocall=true
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('videocall') === 'true') {
            window.history.replaceState({}, '', '/');
            setIsOpen(true);
            setTimeout(() => {
                startCall();
            }, 500);
        }
    }, []);

    // Écouter les événements Socket.IO WebRTC
    useEffect(() => {
        if (!socket) return;

        const onUserJoined = async ({ userId, userName }) => {
            console.log('📹 Utilisateur rejoint:', userName);
            setRemoteUser(userName);
            const pc = createPeerConnection();
            if (localStream) {
                localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
            }
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('offer', { offer: pc.localDescription });
        };

        const onOffer = async ({ offer, userName }) => {
            console.log('📹 Offre reçue de:', userName);
            setRemoteUser(userName);
            const pc = createPeerConnection();
            if (localStream) {
                localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
            }
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit('answer', { answer: pc.localDescription });
        };

        const onAnswer = async ({ answer }) => {
            console.log('📹 Réponse reçue');
            await handleAnswer(answer);
        };

        const onIceCandidate = async ({ candidate }) => {
            await handleIceCandidate(candidate);
        };

        const onUserLeft = () => {
            console.log('📹 Utilisateur parti');
            handleCallEnded();
        };

        socket.on('video-user-joined',   onUserJoined);
        socket.on('video-offer',         onOffer);
        socket.on('video-answer',        onAnswer);
        socket.on('video-ice-candidate', onIceCandidate);
        socket.on('video-user-left',     onUserLeft);

        return () => {
            socket.off('video-user-joined',   onUserJoined);
            socket.off('video-offer',         onOffer);
            socket.off('video-answer',        onAnswer);
            socket.off('video-ice-candidate', onIceCandidate);
            socket.off('video-user-left',     onUserLeft);
        };
    }, [socket, localStream, createPeerConnection, handleAnswer, handleIceCandidate, handleCallEnded]);

    // Démarrer un appel
    const startCall = async () => {
        const stream = await startMedia();
        if (!stream) return;
        setCallState('waiting');
        socket.emit('video-join', { room: 'video-room' });
    };

    // Raccrocher
    const hangup = () => {
        socket.emit('video-leave', { room: 'video-room' });
        closeConnection();
        stopMedia();
        setCallState('idle');
        setRemoteStream(null);
        setRemoteUser(null);
    };

    return (
        <>
            {/* Bouton flottant vidéo */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-violet-700 hover:bg-violet-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                title="Appel vidéo"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
            </button>

            {/* Fenêtre vidéo */}
            {isOpen && (
                <div className="fixed bottom-40 right-6 z-50 w-80 md:w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-zinc-800 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                                callState === 'inCall'   ? 'bg-green-400 animate-pulse'  :
                                    callState === 'waiting' ? 'bg-yellow-400 animate-pulse' :
                                        'bg-zinc-500'
                            }`} />
                            <span className="text-white text-sm font-semibold">
                                {callState === 'idle'    && 'Appel Vidéo'}
                                {callState === 'waiting' && 'En attente...'}
                                {callState === 'inCall'  && `En appel${remoteUser ? ` avec ${remoteUser}` : ''}`}
                            </span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">✕</button>
                    </div>

                    {/* Vidéos */}
                    <div className="relative bg-zinc-950 aspect-video">
                        {callState === 'inCall' ? (
                            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                {callState === 'idle' && (
                                    <div className="text-center text-zinc-500">
                                        <div className="text-4xl mb-2">📹</div>
                                        <p className="text-sm">Démarrez un appel vidéo</p>
                                    </div>
                                )}
                                {callState === 'waiting' && (
                                    <div className="text-center text-zinc-400">
                                        <div className="text-4xl mb-2 animate-pulse">⏳</div>
                                        <p className="text-sm">En attente d'un participant...</p>
                                        <p className="text-xs text-zinc-500 mt-1">Partagez le lien du portfolio</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Vidéo locale miniature */}
                        {localStream && (
                            <div className="absolute bottom-2 right-2 w-24 h-16 rounded-lg overflow-hidden border-2 border-violet-500 shadow-lg">
                                <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Erreur */}
                    {error && (
                        <div className="px-4 py-2 bg-red-500/10 text-red-400 text-xs">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Contrôles */}
                    {callState === 'idle' ? (
                        <div className="p-4">
                            <button
                                onClick={startCall}
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                                </svg>
                                Démarrer l'appel
                            </button>
                        </div>
                    ) : (
                        <VideoControls
                            audioEnabled={audioEnabled}
                            videoEnabled={videoEnabled}
                            onToggleAudio={toggleAudio}
                            onToggleVideo={toggleVideo}
                            onHangup={hangup}
                        />
                    )}
                </div>
            )}
        </>
    );
}