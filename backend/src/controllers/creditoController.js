const Credito = require('../models/Credito');
const db = require('../config/db'); 


exports.getCreditos = (req, res) => {
  Credito.getAllCreditos((err, creditos) => {
      if (err) {
          console.error('Error al obtener los creditos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else {
          res.json(creditos);
      }
  });
};

exports.createCredit = (req, res) => {
    Credito.createCredit(req.body, (err, creditos) => {
        if (err) {
            console.error('Error al crear el credito:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json(creditos);
        }
    });
};

exports.deleteCredit = (req, res) => {
    Credito.deleteCredit(req.params.id, (err, creditos) => {
        if (err) {
            console.error('Error al eliminar el desactivar:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json(creditos);
        }
    });
}