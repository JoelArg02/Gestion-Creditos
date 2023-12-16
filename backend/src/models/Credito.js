const db = require('../config/db');

const Credito = {};

Credito.getAllCreditos = (callback) => {
  db.query('SELECT * FROM creditos', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

Credito.createCredit = (newCredit, callback) => {
  db.query('INSERT INTO creditos (id_usuario_credito_crea, id_usuario_credito_revisa, monto, interes, fecha_inicio, Fecha_vencimiento, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)', newCredit, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

Credito.deleteCredit = (id, callback) => {
  db.query('UPDATE creditos SET Estado = 0 WHERE id_credito = ?', id, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = Credito;