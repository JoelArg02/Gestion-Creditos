const db = require('../config/db');

const Referencia = {};

Referencia.createReferencia = (nombreTrabajo, telefonoTrabajo, telefonoTrabajoC, callback) => {
  db.query(
    'INSERT INTO referencia (nombre_trabajo, telefono_trabajo, telefono_trabajo_c) VALUES (?, ?, ?)',
    [nombreTrabajo, telefonoTrabajo, telefonoTrabajoC],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.affectedRows === 1) {
        callback(null, "Referencia creada con éxito");
      } else {
        callback(new Error("No se pudo crear la referencia"), null);
      }
    }
  );
};

Referencia.getAllReferencias = (callback) => {
  db.query('SELECT * FROM referencia', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};


module.exports = Referencia;
