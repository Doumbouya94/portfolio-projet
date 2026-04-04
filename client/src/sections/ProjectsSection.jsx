import { PROJECTS } from '../utils/constants.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-2">Projets</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Ce que j'ai <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">construit</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto text-sm">
                        Une sélection de projets académiques et personnels réalisés durant ma formation.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {PROJECTS.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <div className="text-center mt-10">
                    <a href="https://github.com/Doumbouya94" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:border-violet-500 text-zinc-600 dark:text-zinc-400 hover:text-violet-500 font-semibold px-6 py-3 rounded-lg transition-colors">
                        Voir plus sur GitHub ↗
                    </a>
                </div>
            </div>
        </section>
    );
}