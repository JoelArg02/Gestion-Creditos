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

Usuario.createUser = (usuario, contrasena, id_configuracion_usuario, callback) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback debe ser una función');
  }

  bcrypt.hash(contrasena, 10, function(err, hash) {
    if (err) {
      return callback(err);
    }

    db.query('INSERT INTO usuarios (usuario, contrasena, id_configuracion_usuario) VALUES (?, ?, ?)', 
    [usuario, hash, id_configuracion_usuario], function(error, result) {
      if (error) {
        return callback(error);
      }

      callback(null, result);
    });
  });
};


Usuario.findUserByUser = (usuario, callback) => {
  db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(new Error("Usuario no existe"), null);
      } else {
        callback(null, results[0]);
      }
    }
  });
};



module.exports = Usuario;
