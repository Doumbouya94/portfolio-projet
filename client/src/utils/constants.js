// Informations personnelles
export const PERSONAL_INFO = {
    name: 'Aboubacar Sidiki Doumbouya',
    shortName: 'Aboubacar',
    title: 'Développeur Full Stack Junior',
    subtitle: 'Étudiant en Techniques de l\'informatique — Collège LaSalle',
    email: 'sidiki940917@gmail.com',
    phone: '514-791-6041',
    location: 'Montréal, QC, Canada',
    github: 'https://github.com/Doumbouya94',
    linkedin: 'https://linkedin.com/in/aboubacar-doumbouya',
    available: true,
};

// Compétences
export const SKILLS = [
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'React', level: 75, category: 'Frontend' },
    { name: 'HTML & CSS', level: 85, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 75, category: 'Frontend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'PHP', level: 70, category: 'Backend' },
    { name: 'Python', level: 75, category: 'Backend' },
    { name: 'C#', level: 70, category: 'Backend' },
    { name: 'SQL Server', level: 75, category: 'Base de données' },
    { name: 'MySQL', level: 70, category: 'Base de données' },
    { name: 'Docker', level: 70, category: 'Outils' },
    { name: 'Git', level: 75, category: 'Outils' },
    { name: 'WordPress', level: 70, category: 'Outils' },
];

// Projets
export const PROJECTS = [
    {
        id: 1,
        title: 'Portfolio Professionnel',
        description: 'Portfolio fullstack avec chat temps réel et vidéo WebRTC. Construit avec React, Node.js, Socket.IO et Docker.',
        tags: ['React', 'Node.js', 'Socket.IO', 'Docker', 'Tailwind'],
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#8b5cf6',
    },
    {
        id: 2,
        title: 'ChatApp Temps Réel',
        description: 'Application de chat en temps réel avec React et Socket.IO. Messagerie instantanée multi-utilisateurs.',
        tags: ['React', 'Socket.IO', 'Node.js'],
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#06b6d4',
    },
    {
        id: 3,
        title: 'Plateforme Crypto',
        description: 'Site web de transactions de cryptomonnaies en ligne avec gestion de base de données.',
        tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL Server'],
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#f97316',
    },
    {
        id: 4,
        title: 'Système de Gestion de Stock',
        description: 'Application de gestion de bibliothèque avec recherche, ajout et suppression de livres.',
        tags: ['C#', 'Windows Forms', 'SQL Server'],
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#22c55e',
    },
];

// Expériences et formations
export const EXPERIENCES = [
    {
        id: 1,
        type: 'work',
        title: 'Agent de Sécurité',
        company: 'BEST (GardaWorld)',
        location: 'Montréal, QC',
        period: '04/2025 — Présent',
        description: 'Gestion d\'outils de surveillance informatisés, rédaction de rapports d\'incidents et contrôle des accès.',
    },
    {
        id: 2,
        type: 'education',
        title: 'DEC — Techniques de l\'informatique',
        company: 'Collège LaSalle',
        location: 'Montréal, QC',
        period: '2023 — Présent',
        description: 'Formation en développement web, bases de données, programmation orientée objet et DevOps.',
    },
    {
        id: 3,
        type: 'work',
        title: 'Assembleur',
        company: 'Nortek Air Solution',
        location: 'Montréal, QC',
        period: '05/2024 — 08/2024',
        description: 'Lecture de plans techniques et assemblage de composantes selon les spécifications.',
    },
    {
        id: 4,
        type: 'work',
        title: 'Community Manager',
        company: 'FODA',
        location: 'Conakry, Guinée',
        period: '01/2022 — 07/2023',
        description: 'Gestion de contenu digital, animation des réseaux sociaux et communication en ligne.',
    },
    {
        id: 5,
        type: 'education',
        title: 'Licence — Vulgarisation Agricole',
        company: 'Institut VGE/F',
        location: 'Conakry, Guinée',
        period: '2016 — 2020',
        description: 'Formation universitaire en vulgarisation et développement agricole.',
    },
];