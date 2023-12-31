const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Person = {};

Person.getAllPersons = (callback) => {
    poolc.query('SELECT * FROM persons', (err, results) => {
        if (err) {
        callback(err, null);
        } else {
        callback(null, results.rows);
        }
    });
    };

module.exports = Person;
