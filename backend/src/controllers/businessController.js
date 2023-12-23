const Business = require("../models/Business");

exports.getBusiness = (req, res) => {
  Business.getBusiness((err, Business) => {
    if (err) {
      console.error("Error al obtener los negocios:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(Business);
    }
  });
};

exports.createBusiness = (req, res) => {
  const { negocio, lema, facebook, instagram, whatsapp, correo_admin, correo_publico } = req.body;
  Business.createBusiness(negocio, lema, facebook, instagram, whatsapp, correo_admin, correo_publico, (err, Business) => {
    if (err) {
      console.error("Error al crear el negocio:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(Business);
    }
  });
}

exports.updateBusiness = (req, res) => {
  const { negocio, lema, facebook, instagram, whatsapp, correo_admin, correo_publico } = req.body;
  Business.updateBusiness(negocio, lema, facebook, instagram, whatsapp, correo_admin, correo_publico, (err, Business) => {
    if (err) {
      console.error("Error al actualizar el negocio:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(Business);
    }
  });
}