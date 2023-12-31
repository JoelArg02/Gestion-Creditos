const Rol = require("../models/Rol");

exports.getRols = (req, res) => {
  Rol.getAllRols((err, rols) => {
    if (err) {
      console.error("Error al obtener los roles:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(rols);
    }
  });
};
