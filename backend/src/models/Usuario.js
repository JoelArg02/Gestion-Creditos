const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Usuario = {};

Usuario.getAllUsuarios = (callback) => {
  poolc.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
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

    poolc.query('INSERT INTO usuarios (usuario, contrasena, id_configuracion_usuario) VALUES ($1, $2, $3)', 
    [usuario, hash, id_configuracion_usuario], function(error, result) {
      if (error) {
        return callback(error);
      }

      callback(null, result);
    });
  });
};

Usuario.findUserByUser = (usuario, callback) => {
  poolc.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.rows.length === 0) {
        callback(new Error("Usuario no existe"), null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  });
};

Usuario.updatePassword = (id_usuario, contrasena, callback) => {
  bcrypt.hash(contrasena, 10, function(err, hash) {
    if (err) {
      return callback(err);
    }

    poolc.query('UPDATE usuarios SET contrasena = $1 WHERE id_usuario = $2', [hash, id_usuario], function(error, result) {
      if (error) {
        return callback(error);
      }

      callback(null, result);
    });
  });
};

module.exports = Usuario;
