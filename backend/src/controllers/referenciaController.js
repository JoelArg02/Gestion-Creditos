const Referencia = require("../models/Referencia");

exports.createReference = (req, res) => {
  console.log(req.body);
  const {
    nombre_trabajo,
    telefono_trabajo,
    telefono_trabajo_c,
    imagen_hogar,
    rol_pago,
  } = req.body;

  if (
    !nombre_trabajo ||
    !telefono_trabajo ||
    !telefono_trabajo_c ||
    !imagen_hogar ||
    !rol_pago
  ) {
    return res.status(400).json({ error: "Datos faltantes o inválidos" });
  }

  Referencia.createReference(
    nombre_trabajo,
    telefono_trabajo,
    telefono_trabajo_c,
    imagen_hogar,
    rol_pago,
    (err, id_referencia) => {
      if (err) {
        console.error("Error al crear la referencia:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      res.json({ id_referencia });
    }
  );
}

exports.getReferencias = (req, res) => {
  Referencia.getAllReferencias((err, referencias) => {
    if (err) {
      console.error("Error al obtener las referencias:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(referencias);
    }
  });
};

exports.getReferenceById = async (req, res) => {
  const { id_referencia } = req.params;

  Referencia.getReferenceById(id_referencia, (err, usuario) => {
    if (err) {
      console.error("Error al obtener la persona por id:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    } else if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  });
};
