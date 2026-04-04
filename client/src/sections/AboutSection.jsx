import { PERSONAL_INFO } from '../utils/constants.js';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-6xl mx-auto">

                {/* Title */}
                <div className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-2">À propos</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Passionné par le code,{' '}
                        <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              curieux par nature
            </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Text */}
                    <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <p>
                            Je suis <strong className="text-zinc-900 dark:text-white">Aboubacar Sidiki Doumbouya</strong>,
                            étudiant finissant en Techniques de l'informatique au Collège LaSalle de Montréal.
                        </p>
                        <p>
                            Originaire de Guinée, j'ai développé une passion pour le développement web full-stack
                            en travaillant sur des projets concrets allant des applications C# aux plateformes web
                            modernes avec React, Node.js et Docker.
                        </p>
                        <p>
                            Je suis rigoureux, curieux et j'apprends rapidement. Mon objectif est de rejoindre
                            une équipe dynamique pour contribuer à des projets innovants et continuer à évoluer
                            en tant que développeur.
                        </p>

                        <div className="pt-4 flex flex-wrap gap-3">
                            {[
                                { icon: '📧', label: PERSONAL_INFO.email },
                                { icon: '📍', label: PERSONAL_INFO.location },
                                { icon: '🌐', label: 'Français & Anglais' },
                            ].map(item => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm"
                                >
                                    <span>{item.icon}</span>
                                    <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: '🎓', title: 'Formation', desc: 'DEC Techniques de l\'informatique — Collège LaSalle' },
                            { icon: '💻', title: 'Spécialité', desc: 'Développement Web Full Stack' },
                            { icon: '🐳', title: 'DevOps', desc: 'Docker, Git, déploiement cloud' },
                            { icon: '🌍', title: 'Langues', desc: 'Français courant, Anglais intermédiaire' },
                        ].map(card => (
                            <div
                                key={card.title}
                                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:border-violet-500 transition-colors"
                            >
                                <div className="text-2xl mb-2">{card.icon}</div>
                                <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-1">{card.title}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}