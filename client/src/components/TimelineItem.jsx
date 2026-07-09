import { GraduationCap, Briefcase } from 'lucide-react';

export default function TimelineItem({ item, isLast }) {
    const isEducation = item.type === 'education';
    const Icon = isEducation ? GraduationCap : Briefcase;

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    isEducation ? 'bg-violet-500' : 'bg-fuchsia-400'
                }`} />
                {!isLast && <div className="w-0.5 bg-zinc-200 dark:bg-zinc-800 flex-1 mt-1" />}
            </div>

            <div className="pb-10">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
              isEducation
                  ? 'bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                  : 'bg-fuchsia-100 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400'
          }`}>
            <Icon size={12} strokeWidth={1.75} />
              {isEducation ? 'Formation' : 'Emploi'}
          </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{item.period}</span>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-violet-600 dark:text-violet-400 mb-1">{item.company} — {item.location}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
        </div>
    );
}
