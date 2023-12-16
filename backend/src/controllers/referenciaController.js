const Referencia = require('../models/Referencia');
const bcrypt = require('bcrypt');
const db = require('../config/db'); 
const jwt = require('jsonwebtoken');
const secretKey = 'joelxd';




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

