const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/skills.controller.js');

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Retourne toutes les compétences
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Liste des compétences
 */
router.get('/', getAll);

module.exports = router;