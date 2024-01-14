const poolc = require("../config/db"); // Asegúrate de que la ruta sea correcta

const Person = {};

Person.getPersons = (callback) => {
  poolc.query("SELECT * FROM personas", (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

Person.getPersonById = (id, callback) => {
  poolc.query(
    "SELECT * FROM personas where id_persona = $1",
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

Person.createPerson = (
  nombre,
  apellido,
  telefono,
  cedula,
  telefono_2,
  provincia,
  ciudad,
  direccion,
  direccion_2,
  correo,
  id_referencia_persona,
  callback
) => {
  if (typeof callback !== "function") {
    throw new Error("Callback debe ser una función");
  }
  poolc.query(
    "INSERT INTO personas (nombre, apellido, telefono, cedula, telefono_2, provincia, ciudad, direccion, direccion_2, correo, id_referencia_persona) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_persona",
    [
      nombre,
      apellido,
      telefono,
      cedula,
      telefono_2,
      provincia,
      ciudad,
      direccion,
      direccion_2,
      correo,
      id_referencia_persona,
    ],
    function (error, result) {
      if (error) {
        return callback(error);
      }

      // Asegúrate de que result contiene el ID y pásalo al callback
      const userId = result.rows[0].id_persona;
      callback(null, userId);
    }
  );
};

module.exports = Person;
