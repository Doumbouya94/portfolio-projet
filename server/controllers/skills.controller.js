const db = require('../config/db.js');

const getAll = (req, res) => {
    const skills = db.prepare('SELECT * FROM skills ORDER BY category, name').all();
    res.json({ success: true, count: skills.length, data: skills });
};

module.exports = { getAll };