import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-8xl font-bold text-violet-500 mb-4">404</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Oups ! Cette page n'existe pas.
            </p>
            <Link
                to="/"
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
}