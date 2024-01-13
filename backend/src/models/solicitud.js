const poolc = require("../config/db"); 

const Solicitud = {};

Solicitud.crear = (datosSolicitud, callback) => {
  const { nombreCliente, cedulaCliente, emailCliente, valorDinero, detalles } =
    datosSolicitud;
  const idFormularioCliente = datosSolicitud.idFormularioCliente; 

  poolc.query(
    "INSERT INTO solicitudes (nombre_cliente, cedula_cliente, email_cliente, valor_dinero, detalles, id_formulario_cliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      nombreCliente,
      cedulaCliente,
      emailCliente,
      valorDinero,
      detalles,
      idFormularioCliente,
    ],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

Solicitud.getByFormularioId = (formularioId, callback) => {
  poolc.query(
    "SELECT * FROM solicitudes WHERE id_formulario_cliente = $1",
    [formularioId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

module.exports = Solicitud;
