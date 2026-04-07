const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/projects.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.get('/',        getAll);
router.get('/:id',     getOne);
router.post('/',       auth, create);
router.put('/:id',     auth, update);
router.delete('/:id',  auth, remove);

module.exports = router;