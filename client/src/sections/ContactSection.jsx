import { useState } from 'react';
import { PERSONAL_INFO } from '../utils/constants.js';
import { postContact } from '../hooks/useApi.js';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = ({ target: { name, value } }) =>
        setForm(prev => ({ ...prev, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await postContact(form);
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            setError('Erreur lors de l\'envoi. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-2">Contact</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Travaillons <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">ensemble</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto text-sm">
                        Vous avez un projet en tête ? N'hésitez pas à me contacter, je réponds généralement sous 24h.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Mes coordonnées</h3>
                        {[
                            { icon: '📧', label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
                            { icon: '📱', label: 'Téléphone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
                            { icon: '📍', label: 'Localisation', value: PERSONAL_INFO.location, href: null },
                            { icon: '💻', label: 'GitHub', value: 'github.com/Doumbouya94', href: PERSONAL_INFO.github },
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                                <div>
                                    <p className="text-xs text-zinc-400">{item.label}</p>
                                    {item.href ? (
                                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-violet-500 transition-colors">{item.value}</a>
                                    ) : (
                                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {sent && (
                            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-3 text-sm">
                                ✅ Message envoyé ! Je vous répondrai bientôt.
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm">
                                ⚠️ {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Votre nom</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-violet-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Votre email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-violet-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Votre message</label>
                            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Bonjour, je souhaite..." className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                            {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}