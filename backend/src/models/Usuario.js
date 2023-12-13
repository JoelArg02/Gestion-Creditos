const db = require('../config/db');

// Función para obtener todos los usuarios
exports.getAllUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Función para obtener un usuario por ID
exports.getUsuarioById = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
