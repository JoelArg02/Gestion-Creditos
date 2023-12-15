const Credito = require('../models/Creditos');

exports.getAllCreditos = (req, res) => {
  Credito.getAllCreditos((err, creditos) => {
    if (err) {
      console.error('Error al obtener los creditos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(creditos);
  });
};

