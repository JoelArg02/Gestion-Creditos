const poolc = require("../config/db"); // Asegúrate de que la ruta sea correcta

const Referencia = {};

Referencia.createReferencia = (nombreTrabajo, telefonoTrabajo, telefonoTrabajoC, callback) => {
  db.query(
    'INSERT INTO referencias (nombre_trabajo, telefono_trabajo, telefono_trabajo_c, ) VALUES (?, ?, ?)',
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
  db.query('SELECT * FROM referencias', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

Referencia.getReferenceById = (id, callback) => {
  poolc.query(
    "SELECT * FROM referencias where id_referencia = $1",
    [id],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};


module.exports = Referencia;
