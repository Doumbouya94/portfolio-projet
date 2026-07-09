import { Loader2, AlertTriangle, Github } from 'lucide-react';
import { useApi } from '../hooks/useApi.js';
import ProjectStory from '../components/ProjectStory.jsx';
import Reveal from '../components/Reveal.jsx';

export default function ProjectsSection() {
    const { data: projects, loading, error } = useApi('/api/projects');

    return (
        <section id="projects" className="py-28 px-6 bg-gradient-to-b from-sky-50/40 to-white dark:from-zinc-950 dark:to-zinc-950 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <Reveal className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-3">Projets</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Ce que j'ai <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">construit</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-5 max-w-xl mx-auto text-sm">
                        Une sélection de projets académiques et personnels réalisés durant ma formation.
                    </p>
                </Reveal>

                {loading && (
                    <div className="text-center py-20">
                        <Loader2 size={28} strokeWidth={1.75} className="mx-auto mb-3 animate-spin text-violet-500" />
                        <p className="text-zinc-500 dark:text-zinc-400">Chargement des projets...</p>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center gap-2 text-center py-10 text-red-400">
                        <AlertTriangle size={18} strokeWidth={1.75} />
                        <p>Erreur de chargement des projets</p>
                    </div>
                )}

                {projects && (
                    <>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {projects.map((project, i) => (
                                <ProjectStory key={project.id} project={project} index={i} />
                            ))}
                        </div>
                        <Reveal className="text-center mt-12">
                            <a href="https://github.com/Doumbouya94" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium px-6 py-3 rounded-full transition-colors">
                                <Github size={16} strokeWidth={1.75} />
                                Voir plus sur GitHub
                            </a>
                        </Reveal>
                    </>
                )}
            </div>
        </section>
    );
}
