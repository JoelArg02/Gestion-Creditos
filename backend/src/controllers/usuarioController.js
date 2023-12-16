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

exports.findUserByUser = (req, res) => {
  const { usuario } = req.params;
  Usuario.findUserByUser(usuario, (err, usuario) => {
      if (err) {
          console.error('Error al obtener el usuario:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else {
          res.json(usuario);
      }
  });
}

exports.register = (req, res) => {
  const { usuario, contrasena, id_configuracion_negocio } = req.body;
  if (!usuario || !contrasena || !id_configuracion_negocio) {
    return res.status(400).json({ error: 'Datos faltantes o inválidos' });
  }

  Usuario.createUser(usuario, contrasena, id_configuracion_negocio, (error, user) => {
    if (error) {

      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    if (user) {
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  });
};

exports.login = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Datos faltantes o inválidos' });
  }

  Usuario.findUserByUser(usuario, (errorUsuario, user) => {
    if (errorUsuario) {
      console.error('Error al buscar el usuario:', errorUsuario);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    bcrypt.compare(contrasena, user.contrasena, (errorBcrypt, contrasenaValida) => {
      if (errorBcrypt) {
        console.error('Error al verificar la contraseña:', errorBcrypt);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (!contrasenaValida) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }

      jwt.sign({ userId: user.id, userName: user.usuario }, secretKey, { expiresIn: '1h' }, (errorJwt, token) => {
        if (errorJwt) {
          console.error('Error al generar el token:', errorJwt);
          return res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          // Enviar el token al cliente
          res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        }
            

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
      });
    });
  });
};
