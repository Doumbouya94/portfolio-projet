const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller.js');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentification administrateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@portfolio.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);

module.exports = router;