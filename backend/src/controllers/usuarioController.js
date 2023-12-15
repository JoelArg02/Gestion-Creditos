const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const db = require('../config/db'); 
const jwt = require('jsonwebtoken');
const secretKey = 'joelxd';

exports.getUsuarios = (req, res) => {
  Usuario.getAllUsuarios((err, usuarios) => {
      if (err) {
          console.error('Error al obtener los usuarios:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else {
          res.json(usuarios);
      }
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

exports.register = async (req, res) => {
  try {
    const { usuario, contrasena, id_configuracion_negocio } = req.body;
    const user = await Usuario.registerUsuario(usuario, contrasena, id_configuracion_negocio);
    if (!usuario || !contrasena || !id_configuracion_negocio) {
      return res.status(400).json({ error: 'Datos faltantes o inválidos' });
    }
    if (user) {

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;


    // Validar que los datos necesarios estén presentes
    if (!usuario || !contrasena) {
      return res.status(400).json({ error: 'Datos faltantes o inválidos' });
    }

    const user = await Usuario.findUsuarioByUsuario(usuario);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
