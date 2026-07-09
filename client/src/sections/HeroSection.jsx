import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { PERSONAL_INFO } from '../utils/constants.js';

function TiltPhoto() {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });
    const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });
    const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div className="flex justify-center md:justify-end" style={{ perspective: 1000 }}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className="relative"
            >
                <div className="absolute -inset-6 bg-gradient-to-br from-violet-400/40 via-fuchsia-400/30 to-sky-400/30 rounded-[2.5rem] blur-2xl -z-10" />
                <motion.div
                    style={{ x: translateX, y: translateY }}
                    className="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-3xl overflow-hidden shadow-xl shadow-violet-900/10 dark:shadow-black/40"
                >
                    <img src="/avatar.jpeg" alt="Aboubacar Sidiki Doumbouya" className="w-full h-full object-cover object-top" />
                </motion.div>
                <motion.div
                    style={{ x: translateX, y: translateY }}
                    className="absolute -bottom-4 -left-4 flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-900 dark:text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg"
                >
                    <Rocket size={14} strokeWidth={1.75} className="text-violet-500" />
                    Full Stack Developer
                </motion.div>
                <motion.div
                    style={{ x: translateX, y: translateY }}
                    className="absolute -top-4 -right-4 flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-900 dark:text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg"
                >
                    <MapPin size={14} strokeWidth={1.75} className="text-violet-500" />
                    Montréal, QC
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function HeroSection() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <Reveal>
                        <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-zinc-900 backdrop-blur text-zinc-600 dark:text-zinc-300 text-sm px-4 py-1.5 rounded-full mb-8">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Disponible pour un stage
                        </div>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-5">
                            Bonjour, je suis{' '}
                            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Aboubacar</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-1 font-medium">{PERSONAL_INFO.title}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">{PERSONAL_INFO.subtitle}</p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="flex flex-wrap gap-3">
                            <a href="#contact" className="bg-zinc-900 dark:bg-white hover:opacity-80 text-white dark:text-zinc-900 font-medium px-6 py-3 rounded-full transition-opacity">Me contacter</a>
                            <a href="#projects" className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-medium px-6 py-3 rounded-full transition-colors shadow-sm">Voir mes projets</a>
                            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-600 dark:text-zinc-400 font-medium px-6 py-3 rounded-full transition-colors">GitHub ↗</a>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="flex gap-10 mt-14">
                            {[
                                { value: '5+', label: 'Projets réalisés' },
                                { value: '3+', label: 'Langages maîtrisés' },
                                { value: '2', label: 'Années de formation' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <div className="text-2xl font-semibold text-zinc-900 dark:text-white">{stat.value}</div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
                <TiltPhoto />
            </div>
        </section>
    );
}