const Pago = require('../models/Pagos');

exports.getPagos = (req, res) => {
  Pago.getPagos((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los pagos.' });
    }
    return res.status(200).json(result.rows);
  });
}

exports.createPago = (req, res) => {
  const { idCredito, monto, fechaPago } = req.body; // Los datos del pago provienen del cuerpo de la solicitud
  const pagoData = { idCredito, monto, fechaPago };

  Pago.createPago(pagoData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear el pago.' });
    }
    return res.status(201).json(result.rows[0]);
  });
};

exports.getPagosByCredito = (req, res) => {
  const { idCredito } = req.params; // El ID del crédito proviene de los parámetros de la URL

  Pago.getPagosByCredito(idCredito, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los pagos.' });
    }
    return res.status(200).json(result.rows);
  });
};
