export default function ProjectCard({ project }) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-violet-500 hover:-translate-y-1 transition-all duration-300">
            {/* Color bar */}
            <div
                className="w-12 h-1 rounded-full mb-4"
                style={{ backgroundColor: project.color }}
            />

            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span
                        key={tag}
                        className="text-xs bg-violet-500/10 text-violet-500 border border-violet-500/20 px-2 py-0.5 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
                {project.github && (

                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-violet-500 transition-colors flex items-center gap-1"
                    >
                    ⌥ Code source
                    </a>
                    )}
                {project.live && (

                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-violet-500 transition-colors flex items-center gap-1"
                    >
                    ↗ Voir le projet
                    </a>
                    )}
            </div>
        </div>
    );
}