const poolc = require("../config/db"); // Asegúrate de que la ruta sea correcta

const Referencia = {};

Referencia.createReference = (
  nombre_trabajo,
  telefono_trabajo,
  telefono_trabajo_c,
  imagen_hogar,
  rol_pago,
  callback
) => {
  if (typeof callback !== "function") {
    throw new Error("Callback debe ser una función");
  }
  poolc.query(
    "INSERT INTO referencias (nombre_trabajo, telefono_trabajo, telefono_trabajo_c, imagen_hogar, rol_pago) VALUES ($1, $2, $3, $4, $5) RETURNING id_referencia",
    [
      nombre_trabajo,
      telefono_trabajo,
      telefono_trabajo_c,
      imagen_hogar,
      rol_pago,
    ],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.rows[0].id_referencia);
      }
    }
  );
};

Referencia.getAllReferencias = (callback) => {
  poolc.query("SELECT * FROM referencias", (error, results) => {
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
