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

  const query = `
    SELECT usuarios.*, configuracion_negocio.negocio 
    FROM usuarios 
    JOIN configuracion_negocio ON usuarios.id_configuracion_usuario = configuracion_negocio.id_configuracion 
    WHERE usuarios.usuario = ?
  `;

  db.query(query, [usuario], (errorUsuario, results) => {
    if (errorUsuario) {
      console.error('Error al buscar el usuario:', errorUsuario);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(contrasena, user.contrasena, (errorBcrypt, contrasenaValida) => {
      if (errorBcrypt) {
        console.error('Error al verificar la contraseña:', errorBcrypt);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (!contrasenaValida) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }

      const payload = {
        userId: user.id_usuario,
        userName: user.usuario,
        businessName: user.negocio
      };

      jwt.sign(payload, secretKey, { expiresIn: '1h' }, (errorJwt, token) => {
        if (errorJwt) {
          console.error('Error al generar el token:', errorJwt);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
      });
    });
  });
};

exports.updatePassword = (req, res) => {
  const userId = req.params.id; 
  const { newPassword } = req.body;

  Usuario.updatePassword(userId, newPassword, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  });
};