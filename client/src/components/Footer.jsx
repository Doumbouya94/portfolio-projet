import { PERSONAL_INFO } from '../utils/constants.js';

export default function Footer() {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    © 2025 <span className="text-violet-500 font-semibold">{PERSONAL_INFO.shortName}</span> — Tous droits réservés
                </p>
                <div className="flex items-center gap-4">
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-500 transition-colors">GitHub</a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-500 transition-colors">LinkedIn</a>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-500 transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}