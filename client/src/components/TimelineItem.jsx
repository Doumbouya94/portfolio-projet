export default function TimelineItem({ item, isLast }) {
    return (
        <div className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    item.type === 'education'
                        ? 'bg-violet-500'
                        : 'bg-purple-400'
                }`} />
                {!isLast && <div className="w-0.5 bg-zinc-200 dark:bg-zinc-800 flex-1 mt-1" />}
            </div>

            {/* Content */}
            <div className={`pb-8 ${isLast ? '' : ''}`}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
              item.type === 'education'
                  ? 'bg-violet-500/10 text-violet-500'
                  : 'bg-purple-500/10 text-purple-400'
          }`}>
            {item.type === 'education' ? '🎓 Formation' : '💼 Emploi'}
          </span>
                    <span className="text-xs text-zinc-400">{item.period}</span>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-violet-500 mb-1">{item.company} — {item.location}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
            </div>
        </div>
    );
}