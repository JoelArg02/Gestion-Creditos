
// whatsappRoutes.js
const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/Whatsapp-iController');

router.get('/qr-code', whatsappController.getQRCode);
router.post('/send-message', whatsappController.sendMessage);

// Otras rutas...

module.exports = router;
