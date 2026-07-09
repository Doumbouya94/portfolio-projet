const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_secret_key';

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ success: true, token, user: { id: user.id, email: user.email } });
};

module.exports = { login };