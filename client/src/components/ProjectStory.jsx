import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, ExternalLink } from 'lucide-react';
import Reveal from './Reveal.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectStory({ project, index }) {
    const sectionRef = useRef(null);
    const laptopContentRef = useRef(null);
    const phoneContentRef = useRef(null);
    const number = String(index + 1).padStart(2, '0');
    const laptopClipId = `laptop-clip-${index}`;
    const phoneClipId = `phone-clip-${index}`;

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            if (laptopContentRef.current) {
                tl.to(laptopContentRef.current, { y: -260, ease: 'none' }, 0);
            }
            if (phoneContentRef.current) {
                tl.to(phoneContentRef.current, { y: -25, ease: 'none' }, 0);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const renderScreen = (contentRef, x, y, width) => (
        <g ref={contentRef}>
            {project.image ? (
                <image href={project.image} x={x} y={y} width={width} preserveAspectRatio="xMidYMin slice" />
            ) : (
                <foreignObject x={x} y={y} width={width} height={width * 1.5}>
                    <div className="p-3 space-y-2.5" style={{ fontFamily: 'inherit' }}>
                        <div className="h-3 w-2/3 bg-zinc-600 rounded" />
                        <div className="h-3 w-1/2 bg-zinc-600 rounded" />
                        <div className="h-16 w-full rounded-xl mt-3" style={{ backgroundColor: project.color, opacity: 0.35 }} />
                        <div className="h-3 w-full bg-zinc-600 rounded" />
                        <div className="h-3 w-5/6 bg-zinc-600 rounded" />
                        <div className="h-16 w-full rounded-xl mt-3" style={{ backgroundColor: project.color, opacity: 0.35 }} />
                        <div className="h-3 w-2/3 bg-zinc-600 rounded" />
                        <div className="h-3 w-1/2 bg-zinc-600 rounded" />
                        <div className="h-16 w-full rounded-xl mt-3" style={{ backgroundColor: project.color, opacity: 0.35 }} />
                        <div className="h-3 w-full bg-zinc-600 rounded" />
                    </div>
                </foreignObject>
            )}
        </g>
    );

    return (
        <div ref={sectionRef} className="grid md:grid-cols-[64px_1fr_1fr] gap-6 md:gap-10 items-center py-10 min-h-[80vh]">
            <span className="hidden md:block text-6xl font-bold text-violet-100 dark:text-zinc-800 select-none leading-none">
                {number}
            </span>

            <Reveal>
                <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-2">{project.title}</h3>
                <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: project.color }} />
                <p className="text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white dark:bg-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex gap-5">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                            <Terminal size={13} strokeWidth={1.75} /> Code source
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                            <ExternalLink size={13} strokeWidth={1.75} /> Voir le projet
                        </a>
                    )}
                </div>
            </Reveal>

            <Reveal delay={0.1}>
                <svg viewBox="0 0 600 420" className="w-full max-w-[480px] mx-auto" style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id={`bezel-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3f3f46" />
                            <stop offset="100%" stopColor="#18181b" />
                        </linearGradient>
                        <linearGradient id={`base-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#71717a" />
                            <stop offset="100%" stopColor="#3f3f46" />
                        </linearGradient>
                        <clipPath id={laptopClipId}>
                            <rect x="62" y="32" width="406" height="256" rx="4" />
                        </clipPath>
                        <clipPath id={phoneClipId}>
                            <rect x="438" y="240" width="94" height="170" rx="14" />
                        </clipPath>
                    </defs>

                    {/* Laptop base/deck */}
                    <path d="M20,300 L510,300 L485,318 L45,318 Z" fill={`url(#base-${index})`} />
                    <rect x="245" y="303" width="60" height="4" rx="2" fill="#27272a" />

                    {/* Laptop bezel */}
                    <rect x="50" y="20" width="430" height="280" rx="16" fill={`url(#bezel-${index})`} />
                    <circle cx="265" cy="26" r="2" fill="#52525b" />

                    {/* Laptop screen content */}
                    <g clipPath={`url(#${laptopClipId})`}>
                        <rect x="62" y="32" width="406" height="256" fill="#18181b" />
                        {renderScreen(laptopContentRef, 62, 32, 406)}
                    </g>

                    {/* Phone */}
                    <rect x="428" y="228" width="114" height="194" rx="22" fill={`url(#bezel-${index})`} stroke="#09090b" strokeWidth="1" />
                    <rect x="465" y="234" width="20" height="3" rx="1.5" fill="#52525b" />
                    <g clipPath={`url(#${phoneClipId})`}>
                        <rect x="438" y="240" width="94" height="170" fill="#18181b" />
                        {renderScreen(phoneContentRef, 438, 240, 94)}
                    </g>
                </svg>
            </Reveal>
        </div>
    );
}