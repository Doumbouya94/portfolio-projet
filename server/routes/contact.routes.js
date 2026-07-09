const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contact.controller.js');
const auth = require('../middleware/auth.middleware.js');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Envoyer un message de contact
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message envoyé
 */
router.post('/', sendMessage);

/**
 * @swagger
 * /api/contact/messages:
 *   get:
 *     summary: Liste des messages (JWT requis)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/messages', auth, getMessages);

module.exports = router;