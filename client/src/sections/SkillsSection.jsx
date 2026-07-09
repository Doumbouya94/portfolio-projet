import { Loader2, AlertTriangle } from 'lucide-react';
import { useApi } from '../hooks/useApi.js';
import SkillBadge from '../components/SkillBadge.jsx';
import Reveal from '../components/Reveal.jsx';

export default function SkillsSection() {
    const { data: skills, loading, error } = useApi('/api/skills');

    const categories = skills ? [...new Set(skills.map(s => s.category))] : [];

    return (
        <section id="skills" className="py-28 px-6 bg-gradient-to-b from-violet-50/40 to-sky-50/40 dark:from-zinc-950 dark:to-zinc-950">
            <div className="max-w-6xl mx-auto">
                <Reveal className="text-center mb-20">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-3">Compétences</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Mon <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">stack technique</span>
                    </h2>
                </Reveal>

                {loading && (
                    <div className="text-center py-20">
                        <Loader2 size={28} strokeWidth={1.75} className="mx-auto mb-3 animate-spin text-violet-500" />
                        <p className="text-zinc-500 dark:text-zinc-400">Chargement des compétences...</p>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center gap-2 text-center py-10 text-red-400">
                        <AlertTriangle size={18} strokeWidth={1.75} />
                        <p>Erreur de chargement des compétences</p>
                    </div>
                )}

                {skills && categories.map((category, ci) => (
                    <div key={category} className="mb-12">
                        <Reveal delay={ci * 0.05}>
                            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <span className="w-8 h-px bg-violet-400" />
                                {category}
                            </h3>
                        </Reveal>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {skills.filter(s => s.category === category).map((skill, i) => (
                                <Reveal key={skill.id} delay={i * 0.04}>
                                    <SkillBadge skill={skill} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
