import { useRef, useCallback } from 'react';

const RTC_CONFIG = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ],
};

export function useWebRTC({ socket, localStream, onRemoteStream, onCallEnded }) {
    const peerConnectionRef = useRef(null);

    const createPeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection(RTC_CONFIG);

        // Quand on reçoit un flux distant
        pc.ontrack = (event) => {
            if (event.streams[0]) {
                onRemoteStream(event.streams[0]);
            }
        };

        // Envoyer les candidats ICE au pair via Socket.IO
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { candidate: event.candidate });
            }
        };

        pc.onconnectionstatechange = () => {
            if (pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
                onCallEnded();
            }
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [socket, onRemoteStream, onCallEnded]);

    // Ajouter les pistes locales à la connexion
    const addLocalTracks = useCallback((stream) => {
        const pc = peerConnectionRef.current;
        if (!pc || !stream) return;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }, []);

    // Créer et envoyer une offre (initiateur)
    const createOffer = useCallback(async () => {
        const pc = peerConnectionRef.current;
        if (!pc) return;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { offer: pc.localDescription });
    }, [socket]);

    // Recevoir et répondre à une offre
    const handleOffer = useCallback(async (offer) => {
        const pc = peerConnectionRef.current;
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { answer: pc.localDescription });
    }, [socket]);

    // Recevoir une réponse
    const handleAnswer = useCallback(async (answer) => {
        const pc = peerConnectionRef.current;
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }, []);

    // Recevoir un candidat ICE
    const handleIceCandidate = useCallback(async (candidate) => {
        const pc = peerConnectionRef.current;
        if (!pc) return;
        try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
            console.error('Erreur ICE candidate:', err);
        }
    }, []);

    // Fermer la connexion
    const closeConnection = useCallback(() => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
    }, []);

    return { createPeerConnection, addLocalTracks, createOffer, handleOffer, handleAnswer, handleIceCandidate, closeConnection };
}