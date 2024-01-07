const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Pago = {};

Pago.getPagos = callback => {
  const query = `
    SELECT *
    FROM pagos;
  `;
  poolc.query(query, callback);
}

Pago.createPago = (pagoData, callback) => {
  const query = `
    INSERT INTO pagos (id_credito, monto, fecha_pago)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { idCredito, monto, fechaPago } = pagoData;
  poolc.query(query, [idCredito, monto, fechaPago], callback);
};

Pago.getPagosByCredito = (idCredito, callback) => {
  const query = `
    SELECT *
    FROM pagos
    WHERE id_credito = $1;
  `;
  poolc.query(query, [idCredito], callback);
};

module.exports = Pago;
