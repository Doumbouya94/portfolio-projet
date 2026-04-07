const db = require('../config/db.js');

const sendMessage = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'name, email et message sont requis' });
    }
    const result = db.prepare(
        'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
    ).run(name, email, message);

    res.status(201).json({ success: true, message: 'Message envoyé !', id: result.lastInsertRowid });
};

const getMessages = (req, res) => {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json({ success: true, count: messages.length, data: messages });
};

module.exports = { sendMessage, getMessages };