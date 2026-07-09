import { useEffect, useRef, useState } from 'react';

export default function SkillBadge({ skill }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="bg-white dark:bg-zinc-900 rounded-xl p-4 hover:-translate-y-1 transition-transform duration-300 shadow-sm"
        >
            <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                <span className="text-xs text-violet-500 font-semibold">{skill.level}%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${skill.level}%` : '0%' }}
                />
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5 block">{skill.category}</span>
        </div>
    );
}
