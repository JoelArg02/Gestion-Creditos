const express = require('express');
const router = express.Router();
const BusinessController = require('../controllers/businessController');


// Obtener negocios
router.get('/', BusinessController.getBusiness);

// Crear un negocio

router.post('/create', BusinessController.createBusiness);

// Actualizar negocio

router.put('/update/:id', BusinessController.updateBusiness);

module.exports = router;
