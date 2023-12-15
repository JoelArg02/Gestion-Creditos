const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de usuario
router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/', usuarioController.getUsuarios);

module.exports = router;
