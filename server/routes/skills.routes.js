const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/skills.controller.js');

router.get('/', getAll);

module.exports = router;