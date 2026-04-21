import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export function useAuth() {
    const [token, setToken]     = useState(localStorage.getItem('admin_token'));
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Identifiants invalides');
            localStorage.setItem('admin_token', data.token);
            setToken(data.token);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('admin_token');
        setToken(null);
    }, []);

    const isAuthenticated = !!token;

    return { token, isAuthenticated, loading, error, login, logout };
}