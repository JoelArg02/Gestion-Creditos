const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.post('/webhook', whatsappController.webhook);

router.post('/send-message', whatsappController.sendMessage);


module.exports = router;
