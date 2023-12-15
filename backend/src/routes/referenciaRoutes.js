const express = require('express');
const router = express.Router();
const referenciaController = require('../controllers/referenciaController');

// Rutas para gestionar referencias
router.post('/referencias', referenciaController.createReferencia);
router.get('/referencias', referenciaController.getAllReferencias);

module.exports = router;
