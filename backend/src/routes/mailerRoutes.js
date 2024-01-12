const express = require('express');
const router = express.Router();
const contactController = require('../controllers/mailerController'); // Asegúrate de que la ruta sea correcta

router.post('/send', contactController.sendContactEmail);

module.exports = router;
