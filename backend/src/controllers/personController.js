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

exports.getPersonById = async (req, res) => {
    const { id_usuario } = req.params;
    Person.getPersonById(id_usuario, (err, usuario) => {
      if (err) {
        console.error("Error al obtener la persona por id:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      } else if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(usuario);
    });
  };

