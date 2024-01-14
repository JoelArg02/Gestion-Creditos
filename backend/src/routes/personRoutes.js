const express = require('express');
const router = express.Router();

const personController = require('../controllers/personController');

//Get obtener datos
router.get('/', personController.getPersons);
router.get("/id/:id_persona", personController.getPersonById);

// Crear persona
router.post('/create', personController.createPerson);

module.exports = router;