const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de usuario
router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/', usuarioController.getUsuarios);
router.get('/:usuario', usuarioController.findUserByUser);
router.put('/user/:id/password', usuarioController.updatePassword);
module.exports = router;
