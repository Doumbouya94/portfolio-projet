import { PERSONAL_INFO } from '../utils/constants.js';

export default function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Text */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Disponible pour un stage
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4">
                        Bonjour, je suis{' '}
                        <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Aboubacar
            </span>
                    </h1>

                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2 font-medium">
                        {PERSONAL_INFO.title}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-8">
                        {PERSONAL_INFO.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-3">

                        href="#contact"
                        className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                        Me contacter
                    </a>

                    href="#projects"
                    className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                    Voir mes projets
                </a>

                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-200 dark:border-zinc-700 hover:border-violet-500 text-zinc-600 dark:text-zinc-400 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                GitHub ↗
            </a>
        </div>

    {/* Stats */}
    <div className="flex gap-8 mt-10">
        {[
            { value: '5+', label: 'Projets réalisés' },
            { value: '3+', label: 'Langages maîtrisés' },
            { value: '2', label: 'Années de formation' },
        ].map(stat => (
            <div key={stat.label}>
                <div className="text-2xl font-bold text-violet-500">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
        ))}
    </div>
</div>

    {/* Photo */}
    <div className="flex justify-center md:justify-end">
        <div className="relative">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-violet-500/30 shadow-2xl shadow-violet-500/20">
                <img
                    src="/avatar.jpeg"
                    alt="Aboubacar Sidiki Doumbouya"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-4 -left-4 bg-violet-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg">
                🚀 Full Stack Developer
            </div>
            <div className="absolute -top-4 -right-4 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-xs font-semibold px-4 py-2 rounded-lg shadow-lg text-zinc-300">
                📍 Montréal, QC
            </div>
        </div>
    </div>

</div>
</section>
);
}