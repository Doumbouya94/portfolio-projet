import { useApi } from '../hooks/useApi.js';
import SkillBadge from '../components/SkillBadge.jsx';

export default function SkillsSection() {
    const { data: skills, loading, error } = useApi('/api/skills');

    const categories = skills ? [...new Set(skills.map(s => s.category))] : [];

    return (
        <section id="skills" className="py-20 px-6 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-2">Compétences</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Mon <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">stack technique</span>
                    </h2>
                </div>

                {loading && (
                    <div className="text-center py-20">
                        <div className="text-4xl mb-2 animate-spin">⚙️</div>
                        <p className="text-zinc-500">Chargement des compétences...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10 text-red-400">
                        <p>⚠️ Erreur de chargement des compétences</p>
                    </div>
                )}

                {skills && categories.map(category => (
                    <div key={category} className="mb-10">
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-px bg-violet-500" />
                            {category}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {skills.filter(s => s.category === category).map(skill => (
                                <SkillBadge key={skill.id} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}