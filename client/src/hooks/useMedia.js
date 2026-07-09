import { useState, useRef, useCallback } from 'react';

export function useMedia() {
    const [localStream, setLocalStream]     = useState(null);
    const [audioEnabled, setAudioEnabled]   = useState(true);
    const [videoEnabled, setVideoEnabled]   = useState(true);
    const [error, setError]                 = useState(null);

    const startMedia = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);
            setError(null);
            return stream;
        } catch (err) {
            setError('Impossible d\'accéder à la caméra/micro : ' + err.message);
            return null;
        }
    }, []);

    const toggleAudio = useCallback(() => {
        if (!localStream) return;
        const track = localStream.getAudioTracks()[0];
        if (track) {
            track.enabled = !track.enabled;
            setAudioEnabled(track.enabled);
        }
    }, [localStream]);

    const toggleVideo = useCallback(() => {
        if (!localStream) return;
        const track = localStream.getVideoTracks()[0];
        if (track) {
            track.enabled = !track.enabled;
            setVideoEnabled(track.enabled);
        }
    }, [localStream]);

    const stopMedia = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
    }, [localStream]);

    return { localStream, audioEnabled, videoEnabled, error, startMedia, toggleAudio, toggleVideo, stopMedia };
}