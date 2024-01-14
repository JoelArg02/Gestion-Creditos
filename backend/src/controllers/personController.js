const Person = require("../models/Person");

exports.getPersons = (req, res) => {
  Person.getPersons((err, Person) => {
    if (err) {
      console.error("Error al obtener las personas:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(Person);
    }
  });
};

exports.getPersonById = async (req, res) => {
  const { id_persona } = req.params;

  Person.getPersonById(id_persona, (err, usuario) => {
    if (err) {
      console.error("Error al obtener la persona por id:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    } else if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  });
};

exports.createPerson = (req, res) => {
  const {
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
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !telefono ||
    !cedula ||
    !telefono_2 ||
    !provincia ||
    !ciudad ||
    !direccion ||
    !direccion_2 ||
    !correo
  ) {
    return res.status(400).json({ error: "Datos faltantes o inválidos" });
  }

  Person.createPerson(
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
    (error, userId) => {
      if (error) {
        console.error("Error al registrar persona:", error);
        return res.status(500).json({ error: "Error al registrar persona" });
      }
      res
        .status(201)
        .json({ message: "Persona registrada exitosamente", id_persona: userId });
    }
  );
};
