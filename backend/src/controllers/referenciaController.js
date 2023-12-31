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

