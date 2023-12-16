const express = require('express');
const router = express.Router();
const creditoController = require('../controllers/creditoController');

router.get('/', creditoController.getCreditos);

module.exports = router;
