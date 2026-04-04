export default function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}