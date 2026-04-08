import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export function useApi(endpoint) {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${API_URL}${endpoint}`);
            if (!res.ok) throw new Error('Erreur API');
            const json = await res.json();
            setData(json.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export async function postContact(formData) {
    const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    const res = await fetch(`${API_URL}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Erreur lors de l\'envoi');
    return res.json();
}