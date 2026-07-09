const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/projects.controller.js');
const auth = require('../middleware/auth.middleware.js');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retourne tous les projets
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Liste des projets
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Retourne un projet par ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projet trouvé
 *       404:
 *         description: Projet introuvable
 */
router.get('/:id', getOne);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Créer un projet (JWT requis)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               github:
 *                 type: string
 *               live:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projet créé
 *       401:
 *         description: Token manquant ou invalide
 */
router.post('/', auth, create);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Modifier un projet (JWT requis)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projet modifié
 *       404:
 *         description: Projet introuvable
 */
router.put('/:id', auth, update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Supprimer un projet (JWT requis)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projet supprimé
 *       404:
 *         description: Projet introuvable
 */
router.delete('/:id', auth, remove);

module.exports = router;