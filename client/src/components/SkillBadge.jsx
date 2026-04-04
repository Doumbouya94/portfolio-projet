export default function SkillBadge({ skill }) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-violet-500 transition-colors">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                <span className="text-xs text-violet-500 font-semibold">{skill.level}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
                <div
                    className="bg-gradient-to-r from-violet-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                />
            </div>
            <span className="text-xs text-zinc-400 mt-1 block">{skill.category}</span>
        </div>
    );
}