require("dotenv").config();
const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "secretKey";

exports.getUsuarios = (req, res) => {
  Usuario.getAllUsuarios((err, usuarios) => {
    if (err) {
      console.error("Error al obtener los usuarios:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json({ usuarios });
  });
};


exports.findUserByUser = (req, res) => {
  const { usuario } = req.params;
  Usuario.findUserByUser(usuario, (err, usuarioEncontrado) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    } else if (!usuarioEncontrado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuarioEncontrado);
  });
};

exports.register = (req, res) => {
  const { usuario, contrasena, id_configuracion_negocio } = req.body;
  if (!usuario || !contrasena || !id_configuracion_negocio) {
    return res.status(400).json({ error: "Datos faltantes o inválidos" });
  }

  Usuario.createUser(
    usuario,
    contrasena,
    id_configuracion_negocio,
    (error, user) => {
      if (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ error: "Error al registrar usuario" });
      }
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    }
  );
};

exports.login = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Datos faltantes o inválidos' });
  }

  const query = `
    SELECT 
      usuarios.*, 
      personas.*,
      configuracion_negocio.negocio 
    FROM usuarios 
    JOIN personas ON usuarios.id_persona = personas.id_persona
    JOIN configuracion_negocio ON usuarios.id_configuracion_negocio = configuracion_negocio.id_configuracion
    WHERE usuarios.usuario = $1
  `;

  poolc.query(query, [usuario], (errorUsuario, results) => {
    if (errorUsuario) {
      console.error('Error al buscar el usuario:', errorUsuario);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = results.rows[0];

    if (!user.contrasena) {
      return res.status(400).json({ error: 'Usuario no tiene contraseña asignada' });
    }
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
        userRole: user.id_rol,
        personName: user.nombre,
        personLastName: user.apellido,
        personPhone: user.telefono,
        personDni: user.cedula,
        personPhone2: user.telefono2,
        personPais: user.pais,
        personCiudad: user.ciudad,
        personDireccion: user.direccion,
        personEmail: user.correo,
        businessName: user.negocio
      };
      console.log(payload);

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
  const { id_usuario } = req.params;
  const { contrasena } = req.body;

  if (!contrasena) {
    return res.status(400).json({ error: "Contraseña no proporcionada" });
  }

  Usuario.updatePassword(id_usuario, contrasena, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  });
};
