const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contact.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.post('/',         sendMessage);
router.get('/messages',  auth, getMessages);

module.exports = router;