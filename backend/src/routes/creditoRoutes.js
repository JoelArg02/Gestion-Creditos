const express = require('express');
const router = express.Router();
const creditoController = require('../controllers/creditoController');

router.get('/', creditoController.getCreditos);

router.get('/:id', creditoController.getCreditByDni);

router.post('/create', creditoController.createCredit);


module.exports = router;
