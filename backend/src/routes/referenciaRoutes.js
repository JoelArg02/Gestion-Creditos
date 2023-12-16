const express = require('express');
const router = express.Router();
const referenciaController = require('../controllers/referenciaController'); 

router.get('/', referenciaController.getReferencias);
module.exports = router;

