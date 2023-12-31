const Person = require('../models/Person');

exports.getPersons = (req, res) => {
    Person.getPersons((err, Person) => {
        if (err) {
            console.error("Error al obtener las personas:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.json(Person);
        }
    });
}

