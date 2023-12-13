const Usuario = require('../models/Usuario.js');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAllUsuarios((err, usuarios) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(usuarios);
  });
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  Usuario.getUsuarioById(id, (err, usuario) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario[0]);
  });
};
