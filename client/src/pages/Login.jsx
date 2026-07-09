import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <ShieldCheck size={28} strokeWidth={1.5} className="mx-auto mb-3 text-violet-500" />
                    <h1 className="text-2xl font-semibold text-white mb-2">Admin Portfolio</h1>
                    <p className="text-zinc-400 text-sm">Connexion administrateur</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm">
                            <AlertTriangle size={15} strokeWidth={1.75} />
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@portfolio.com" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Mot de passe</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                        {loading ? 'Connexion...' : 'Se connecter →'}
                    </button>
                </form>
            </div>
        </div>
    );
}