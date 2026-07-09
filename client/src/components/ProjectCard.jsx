import { Terminal, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
    return (
        <div className="bg-white dark:bg-zinc-950 rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
            <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: project.color }} />
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <div className="flex gap-4">
                {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-500 transition-colors">
                        <Terminal size={13} strokeWidth={1.75} />
                        Code source
                    </a>
                )}
                {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-500 transition-colors">
                        <ExternalLink size={13} strokeWidth={1.75} />
                        Voir le projet
                    </a>
                )}
            </div>
        </div>
    );
}
