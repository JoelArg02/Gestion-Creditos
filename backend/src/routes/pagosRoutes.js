const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

router.get('/', pagosController.getPagos);

// Ruta para crear un nuevo pago
router.post('/pagos', pagosController.createPago);

// Ruta para obtener todos los pagos de un crédito específico
router.get('/pagos/:idCredito', pagosController.getPagosByCredito);

module.exports = router;
