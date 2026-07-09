const db = require('../config/db.js');

const getAll = (req, res) => {
    const projects = db.prepare('SELECT * FROM projects ORDER BY id DESC').all();
    const result = projects.map(p => ({ ...p, tags: JSON.parse(p.tags) }));
    res.json({ success: true, count: result.length, data: result });
};

const getOne = (req, res) => {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' });
    res.json({ success: true, data: { ...project, tags: JSON.parse(project.tags) } });
};

const create = (req, res) => {
    const { title, description, tags, github, live, color } = req.body;
    if (!title || !description || !tags) {
        return res.status(400).json({ success: false, message: 'title, description et tags sont requis' });
    }
    const result = db.prepare(
        'INSERT INTO projects (title, description, tags, github, live, color) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, description, JSON.stringify(tags), github || null, live || null, color || '#8b5cf6');

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: { ...project, tags: JSON.parse(project.tags) } });
};

const update = (req, res) => {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' });

    const { title, description, tags, github, live, color } = req.body;
    db.prepare(
        'UPDATE projects SET title = ?, description = ?, tags = ?, github = ?, live = ?, color = ? WHERE id = ?'
    ).run(
        title || project.title,
        description || project.description,
        tags ? JSON.stringify(tags) : project.tags,
        github || project.github,
        live || project.live,
        color || project.color,
        req.params.id
    );

    const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: { ...updated, tags: JSON.parse(updated.tags) } });
};

const remove = (req, res) => {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Projet introuvable' });
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Projet supprimé', data: { ...project, tags: JSON.parse(project.tags) } });
};

module.exports = { getAll, getOne, create, update, remove };