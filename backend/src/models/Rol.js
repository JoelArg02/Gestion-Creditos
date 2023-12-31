const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Rol = {};

Rol.getAllRols = (callback) => {
  poolc.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

module.exports = Rol;
