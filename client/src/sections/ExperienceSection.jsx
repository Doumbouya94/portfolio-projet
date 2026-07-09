import { EXPERIENCES } from '../utils/constants.js';
import TimelineItem from '../components/TimelineItem.jsx';
import Reveal from '../components/Reveal.jsx';

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-28 px-6 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto">

                <Reveal className="text-center mb-20">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-3">Parcours</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Expérience &{' '}
                        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Formation
            </span>
                    </h2>
                </Reveal>

                <div className="max-w-2xl mx-auto">
                    {EXPERIENCES.map((item, index) => (
                        <Reveal key={item.id} delay={index * 0.05}>
                            <TimelineItem
                                item={item}
                                isLast={index === EXPERIENCES.length - 1}
                            />
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
