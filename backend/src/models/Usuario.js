const db = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {};

Usuario.getAllUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


Usuario.getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

Usuario.registerUsuario = async (usuario, contrasena, id_configuracion_usuario) => {
  try {
    const hash = await bcrypt.hash(contrasena, 10);
    const result = await db.query('INSERT INTO usuarios (usuario, contrasena, id_configuracion_usuario) VALUES (?, ?, ?)', [usuario, hash, id_configuracion_usuario]);
    return result;
  } catch (error) {
    throw error;
  }
};

Usuario.findUsuarioByUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = Usuario;
