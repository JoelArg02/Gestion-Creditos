const poolc = require('../config/db'); // Asegúrate de que la ruta sea correcta

const Business = {};

Business.getBusiness = (callback) => {
  poolc.query('SELECT * FROM configuracion_negocio', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

Business.createBusiness = (callback) => {
  poolc.query('INSERT INTO configuracion_negocio (negocio, lema, facebook, instagram, whatsapp, correo_admin, correo_publico) VALUES ($1, $2, $3, $4, $5, $6, $7)', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });

}

Business.updateBusiness = (callback) => {
  poolc.query('UPDATE configuracion_negocio SET negocio = $1, lema = $2, facebook = $3, instagram = $4, whatsapp = $5, correo_admin = $6, correo_publico = $7 WHERE id_configuracion = $8', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });

}
module.exports = Business;
