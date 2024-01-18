const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

// Ruta para crear una nueva solicitud
router.post('/crear', solicitudController.crearSolicitud);

// Ruta para obtener todas las solicitudes
router.get('/', solicitudController.obtenerSolicitudes);

// Ruta para obtener una solicitud por su ID de formulario
router.get('/formulario/:id', solicitudController.getSolicitudByFormularioId);

// Ruta para obtener una solicitud por su ID
router.get('/id/:id', solicitudController.getSolicitudById);
// Ruta para actualizar el estado de una solicitud
router.put('/actualizar/:id', solicitudController.actualizarEstado);

router.get('/pendientes', solicitudController.obtenerSolicitudesPendientes);

module.exports = router;
