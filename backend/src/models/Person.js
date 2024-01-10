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

module.exports = Person;
