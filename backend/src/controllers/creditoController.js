const Credito = require("../models/Credito");
const db = require("../config/db");

exports.getCreditos = (req, res) => {
  Credito.getAllCreditos((err, creditos) => {
    if (err) {
      console.error("Error al obtener los creditos:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(creditos);
    }
  });
};

exports.getCreditByDni = (req, res) => {
  const { id } = req.params;
  Credito.getCreditByDni(id, (err, creditos) => {
    if (err) {
      console.error("Error al obtener el credito:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else if (!creditos) {
      res.status(404).json({ error: "Credito no encontrado" });
    } else {
      res.json(creditos);
    }
  });
};


exports.deleteCredit = (req, res) => {
  Credito.deleteCredit(req.params.id, (err, creditos) => {
    if (err) {
      console.error("Error al eliminar el desactivar:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(creditos);
    }
  });
};

exports.createCredit = (req, res) => {
  Credito.create(req.body, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(201).json(results.rows[0]);
    }
  });
};
