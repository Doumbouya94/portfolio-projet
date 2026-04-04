import { EXPERIENCES } from '../utils/constants.js';
import TimelineItem from '../components/TimelineItem.jsx';

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-20 px-6 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto">

                {/* Title */}
                <div className="text-center mb-16">
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-widest mb-2">Parcours</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Expérience &{' '}
                        <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Formation
            </span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="max-w-2xl mx-auto">
                    {EXPERIENCES.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            isLast={index === EXPERIENCES.length - 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}