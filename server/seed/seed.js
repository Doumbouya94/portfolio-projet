const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

console.log('🌱 Seeding database...');

// Admin user
const hashedPassword = bcrypt.hashSync('admin123', 10);
db.prepare('INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)')
    .run('admin@portfolio.com', hashedPassword);

// Projects
const projects = [
    {
        title: 'Portfolio Professionnel',
        description: 'Portfolio fullstack avec chat temps réel et vidéo WebRTC. Construit avec React, Node.js, Socket.IO et Docker.',
        tags: JSON.stringify(['React', 'Node.js', 'Socket.IO', 'Docker', 'Tailwind']),
        github: 'https://github.com/Doumbouya94/portfolio-projet',
        live: 'https://portfolio-projet-pi.vercel.app',
        color: '#8b5cf6',
    },
    {
        title: 'ChatApp Temps Réel',
        description: 'Application de chat en temps réel avec React et Socket.IO. Messagerie instantanée multi-utilisateurs.',
        tags: JSON.stringify(['React', 'Socket.IO', 'Node.js']),
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#06b6d4',
    },
    {
        title: 'Plateforme Crypto',
        description: 'Site web de transactions de cryptomonnaies en ligne avec gestion de base de données.',
        tags: JSON.stringify(['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL Server']),
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#f97316',
    },
    {
        title: 'Système de Gestion de Stock',
        description: 'Application de gestion de bibliothèque avec recherche, ajout et suppression de livres.',
        tags: JSON.stringify(['C#', 'Windows Forms', 'SQL Server']),
        github: 'https://github.com/Doumbouya94',
        live: null,
        color: '#22c55e',
    },
];

const insertProject = db.prepare(
    'INSERT OR IGNORE INTO projects (title, description, tags, github, live, color) VALUES (?, ?, ?, ?, ?, ?)'
);

projects.forEach(p => {
    insertProject.run(p.title, p.description, p.tags, p.github, p.live, p.color);
});

// Skills
const skills = [
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

const insertSkill = db.prepare(
    'INSERT OR IGNORE INTO skills (name, level, category) VALUES (?, ?, ?)'
);

skills.forEach(s => insertSkill.run(s.name, s.level, s.category));

console.log('✅ Database seeded successfully!');