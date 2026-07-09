import { useState } from 'react';
import { Mail, Smartphone, MapPin, Github, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/constants.js';
import { postContact } from '../hooks/useApi.js';
import Reveal from '../components/Reveal.jsx';

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

    const CONTACT_ITEMS = [
        { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
        { icon: Smartphone, label: 'Téléphone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
        { icon: MapPin, label: 'Localisation', value: PERSONAL_INFO.location, href: null },
        { icon: Github, label: 'GitHub', value: 'github.com/Doumbouya94', href: PERSONAL_INFO.github },
    ];

    return (
        <section id="contact" className="py-28 px-6 bg-gradient-to-b from-white to-violet-50/40 dark:from-zinc-950 dark:to-zinc-950">
            <div className="max-w-6xl mx-auto">
                <Reveal className="text-center mb-20">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-3">Contact</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Travaillons <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">ensemble</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-5 max-w-xl mx-auto text-sm">
                        Vous avez un projet en tête ? N'hésitez pas à me contacter, je réponds généralement sous 24h.
                    </p>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                    <Reveal className="space-y-7">
                        <h3 className="font-semibold text-zinc-900 dark:text-white text-lg">Mes coordonnées</h3>
                        {CONTACT_ITEMS.map(item => (
                            <div key={item.label} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white dark:bg-zinc-900 shadow-sm rounded-full flex items-center justify-center flex-shrink-0">
                                    <item.icon size={17} strokeWidth={1.75} className="text-violet-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{item.label}</p>
                                    {item.href ? (
                                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{item.value}</a>
                                    ) : (
                                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Reveal>
                    <Reveal delay={0.1}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {sent && (
                                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-400 rounded-xl p-3 text-sm">
                                    <CheckCircle2 size={16} strokeWidth={1.75} />
                                    Message envoyé ! Je vous répondrai bientôt.
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 rounded-xl p-3 text-sm">
                                    <AlertTriangle size={16} strokeWidth={1.75} />
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Votre nom</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-white dark:bg-zinc-900 shadow-sm border border-transparent rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-violet-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Votre email</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="w-full bg-white dark:bg-zinc-900 shadow-sm border border-transparent rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-violet-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Votre message</label>
                                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Bonjour, je souhaite..." className="w-full bg-white dark:bg-zinc-900 shadow-sm border border-transparent rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-violet-400 transition-colors resize-none" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-zinc-900 dark:bg-white hover:opacity-80 disabled:opacity-50 text-white dark:text-zinc-900 font-medium py-3 rounded-full transition-opacity">
                                {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
