const Referencia = require('../models/Referencia');

exports.getReferencias = (req, res) => {
    Referencia.getAllReferencias((err, referencias) => {
        if (err) {
            console.error('Error al obtener las referencias:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json(referencias);
        }
    });
  }

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
  