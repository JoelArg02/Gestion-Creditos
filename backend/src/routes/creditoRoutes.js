const express = require('express');
const router = express.Router();
const creditosController = require('../controllers/creditosController');
//Credit routes

router.get('/credit', creditosController.getAllCreditos);

module.exports = router;
