import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle.jsx';
import { PERSONAL_INFO } from '../utils/constants.js';

const NAV_LINKS = [
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, setDarkMode }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
        }`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="font-bold text-lg text-violet-500">
                    {'<AD />'}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(link => (

                        key={link.label}
                        href={link.href}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                        >
                    {link.label}
                        </a>
                        ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

                    href="#contact"
                    className="hidden md:block bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                    Me contacter
                </a>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-zinc-600 dark:text-zinc-400"
                >
                    <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
                </button>
            </div>
        </div>

    {/* Mobile Menu */}
    {menuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 space-y-4">
            {NAV_LINKS.map(link => (

                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-500"
                >
            {link.label}
                </a>
                ))}

    href="#contact"
    className="block bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
        >
        Me contacter
    </a>
</div>
)}
</header>
);
}