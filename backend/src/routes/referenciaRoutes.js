const express = require('express');
const router = express.Router();
const referenciaController = require('../controllers/referenciaController'); 

router.get('/', referenciaController.getReferencias);
router.get("/id/:id_referencia", referenciaController.getReferenceById);

router.post('/create', referenciaController.createReference);

module.exports = router;

