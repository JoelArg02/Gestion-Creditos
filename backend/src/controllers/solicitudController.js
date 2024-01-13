const Solicitud = require("../models/solicitud");
const mailer = require("../helpers/mailer");
const emailContador = "joelitodaniel02@gmail.com";
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

function cargarContenidoHtml(nombreArchivo) {
  const rutaArchivo = path.join("../html", nombreArchivo);
  return fs.readFileSync(rutaArchivo, "utf8");
}

exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  let fechaExpiracion = null;

  Solicitud.actualizarEstado(
    id,
    estado,
    fechaExpiracion,
    (err, solicitudActualizada) => {
      if (err) {
        return res
          .status(500)
          .send("Error al actualizar la solicitud: " + err.message);
      }

      if (estado === "aprobado") {
        enviarCorreoCliente(
          solicitudActualizada.email_cliente,
          solicitudActualizada.id_formulario_cliente,
          (fechaExpiracion = new Date()),
          fechaExpiracion.setDate(fechaExpiracion.getDate() + 3)
        );
      } else if (estado === "rechazado") {
        enviarCorreoRechazo(solicitudActualizada.email_cliente);
      }

      res.status(200).json(solicitudActualizada);
    }
  );
};

function enviarCorreoCliente(email, idFormularioCliente, fechaExpiracion) {
  const enlaceFormularioCliente = `https://joeltest.tech/formulario-cliente/${idFormularioCliente}`;
  let contenidoHtml = cargarContenidoHtml("cliente-aprobado.html");

  contenidoHtml = contenidoHtml.replace("${enlaceFormularioCliente}", enlaceFormularioCliente);
  contenidoHtml = contenidoHtml.replace("${fechaExpiracion.toLocaleDateString()}", fechaExpiracion.toLocaleDateString());
  
  

  
  mailer.sendEmail(
    email,
    "Solicitud de Crédito Aprobada",
    contenidoHtml,
    (error, info) => {
      if (error) {
        console.error("Error al enviar email al cliente:", error);
      }
    }
  );
}

function enviarCorreoRechazo(email) {
  const contenidoHtml = `
        <html>
            <body>
                <p>Lamentamos informarle que su solicitud de crédito ha sido rechazada.</p>
            </body>
        </html>
    `;
  mailer.sendEmail(
    email,
    "Solicitud de Crédito Rechazada",
    contenidoHtml,
    (error, info) => {
      if (error) {
        console.error("Error al enviar email de rechazo al cliente:", error);
      }
    }
  );
}

exports.crearSolicitud = (req, res) => {
  const idFormularioCliente = uuidv4(); // Generar un UUID para la solicitud
  const datosSolicitud = {
    ...req.body,
    idFormularioCliente,
    estado: "pendiente",
  };

  Solicitud.crear(datosSolicitud, (err, nuevaSolicitud) => {
    if (err) {
      return res
        .status(500)
        .send("Error al crear la solicitud: " + err.message);
    }

    enviarCorreoContador(emailContador, nuevaSolicitud);
    res.status(201).json(nuevaSolicitud);
  });
};

function enviarCorreoContador(email, nuevaSolicitud) {
  let contenidoHtml = cargarContenidoHtml("contador.html");

  contenidoHtml = contenidoHtml.replace(
    "${nombre_cliente}",
    nuevaSolicitud.nombre_cliente
  );
  contenidoHtml = contenidoHtml.replace(
    "${monto_solicitado}",
    nuevaSolicitud.monto_solicitado
  );
  contenidoHtml = contenidoHtml.replace("${detalles}", nuevaSolicitud.detalles);

  mailer.sendEmail(
    email,
    "Nueva Solicitud de Crédito Pendiente",
    contenidoHtml,
    (error, info) => {
      if (error) {
        console.error("Error al enviar email al contador:", error);
      }
    }
  );
}

exports.getSolicitudByFormularioId = (req, res) => {
  const formularioId = req.params.id;

  Solicitud.getByFormularioId(formularioId, (err, solicitud) => {
    if (err) {
      return res
        .status(500)
        .send("Error al obtener la solicitud: " + err.message);
    }
    if (!solicitud) {
      return res.status(404).send("Solicitud no encontrada.");
    }
    res.status(200).json(solicitud);
  });
};

exports.obtenerSolicitudesPendientes = (req, res) => {
  Solicitud.obtenerPendientes((error, solicitudes) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(solicitudes);
    }
  });
};
