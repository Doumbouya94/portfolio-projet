import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {'<'}<span className="text-violet-500">AD</span>{' />'}
                </Link>
                <nav className="hidden md:flex items-center gap-9">
                    {NAV_LINKS.map(link => (
                        <a key={link.label} href={link.href} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">{link.label}</a>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                    <a href="#contact" className="hidden md:block bg-zinc-900 dark:bg-white hover:opacity-80 text-white dark:text-zinc-900 text-sm font-medium px-5 py-2 rounded-full transition-opacity">Me contacter</a>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-zinc-600 dark:text-zinc-400">
                        {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 space-y-4">
                    {NAV_LINKS.map(link => (
                        <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-500">{link.label}</a>
                    ))}
                    <a href="#contact" className="block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium px-4 py-2.5 rounded-full text-center">Me contacter</a>
                </div>
            )}
        </header>
    );
}
