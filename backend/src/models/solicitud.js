const poolc = require("../config/db");

const Solicitud = {};

Solicitud.crear = (datosSolicitud, callback) => {

  const estado = "pendiente";
  const {
    nombreCliente,
    apellidoCliente,
    cedulaCliente,
    emailCliente,
    valorDinero,
    detalles,
    idFormularioCliente,
  } = datosSolicitud;
  poolc.query(
    "INSERT INTO solicitudes (nombre_cliente, apellido_Cliente, cedula_cliente, email_cliente, monto_solicitado, detalles, id_formulario_cliente, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      nombreCliente,
      apellidoCliente,
      cedulaCliente,   
      emailCliente,
      valorDinero,
      detalles,
      idFormularioCliente,
      estado,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(results.rows[0]);
        callback(null, results.rows[0]);
      }
    }
  );
};

Solicitud.actualizarEstado = (
  idSolicitud,
  nuevoEstado,
  fechaExpiracion,
  callback
) => {
  let query = "UPDATE solicitudes SET estado = $1";
  let parametros = [nuevoEstado];

  if (fechaExpiracion) {
    query += ", fecha_expiracion = $2 WHERE id = $3 RETURNING *";
    parametros.push(fechaExpiracion, idSolicitud);
  } else {
    query += " WHERE id = $2 RETURNING *";
    parametros.push(idSolicitud);
  }

  poolc.query(query, parametros, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.rows[0]);
    }
  });
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

Solicitud.obtenerPendientes = (callback) => {
  poolc.query(
    "SELECT * FROM solicitudes WHERE estado = 'pendiente'",
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.rows);
      }
    }
  );
};

Solicitud.GetAllSol = (callback) => {
  poolc.query("SELECT * FROM solicitudes", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.rows);
    }
  });
};


Solicitud.getById = (id, callback) => {
  poolc.query("SELECT * FROM solicitudes WHERE id = $1", [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.rows[0]);
    }
  });
};
module.exports = Solicitud;
