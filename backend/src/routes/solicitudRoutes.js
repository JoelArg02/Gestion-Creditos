const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.post('/crear', solicitudController.crearSolicitud);

router.get('/formulario/:id', solicitudController.getSolicitudByFormularioId);

module.exports = router;
