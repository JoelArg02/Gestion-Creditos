const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Credito = {};

Credito.getAllCreditos = (callback) => {
  poolc.query('SELECT * FROM creditos', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

Credito.getCreditByDni = (id, callback) => {
  poolc.query(`
    SELECT c.*, p.*
    FROM creditos c
    JOIN usuarios u ON c.id_usuario_credito_usuario = u.id_usuario
    JOIN personas p ON u.id_persona = p.id_persona
    WHERE p.cedula = $1
  `, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.rows.length === 0) {
        callback(new Error("Crédito no encontrado"), null);
      } else {
        callback(null, results.rows);
      }
    }
  });
};

Credito.createCredit = (creditoData, callback) => {
  const query = `
    INSERT INTO creditos (id_usuario_credito_crea, id_usuario_credito_usuario, monto, interes, fecha_inicio, fecha_vencimiento, duracion, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const { idUsuarioCreditoCrea, idUsuarioCreditoUsuario, monto, interes, fechaInicio, fechaVencimiento, duracion, estado } = creditoData;
  poolc.query(query, [idUsuarioCreditoCrea, idUsuarioCreditoUsuario, monto, interes, fechaInicio, fechaVencimiento, duracion, estado], callback);
};

module.exports = Credito;
