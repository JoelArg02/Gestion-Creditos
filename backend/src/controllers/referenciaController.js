const Referencia = require('../models/Referencia');

const referenciaController = {};

referenciaController.createReferencia = async (req, res) => {
  const { nombreTrabajo, telefonoTrabajo, telefonoTrabajoC } = req.body;
  
  try {
    const mensaje = await Referencia.createReferencia(nombreTrabajo, telefonoTrabajo, telefonoTrabajoC);
    res.status(201).json({ message: mensaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

referenciaController.getAllReferencias = async (req, res) => {
  try {
    const referencias = await Referencia.getAllReferencias();
    res.status(200).json(referencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = referenciaController;
