const Solicitud = require("../models/solicitud");
const mailer = require("../helpers/mailer");
const emailContador = "joelitodaniel02@gmail.com";
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const exp = require("constants");

function cargarContenidoHtml(nombreArchivo) {
  const rutaArchivo = path.join(__dirname, "../html", nombreArchivo);
  return fs.readFileSync(rutaArchivo, "utf8");
}

exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // Se elimina whatsapp_cliente de aquí
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

      // const whatsappController = require("../controllers/Whatsapp-iController");

      // // Envío de mensaje de WhatsApp
      // if (estado === "aprobado" || estado === "rechazado") {
      //   const whatsapp_cliente = req.body.whatsapp_cliente;
      //   const message =
      //     estado === "aprobado"
      //       ? "Su solicitud de crédito ha sido aprobada."
      //       : "Su solicitud de crédito ha sido rechazada.";

      //   whatsappController
      //     .sendMessage(whatsapp_cliente, message)
      //     .then(() => {
      //       res.status(200).json({
      //         status: "success",
      //         message: `Estado actualizado y mensaje de WhatsApp enviado a ${whatsapp_cliente}.`,
      //         solicitudActualizada,
      //       });
      //     })
      //     .catch((error) => {
      //       console.error("Error al enviar mensaje de WhatsApp:", error);
      //       res.status(500).send("Error al enviar mensaje de WhatsApp.");
      //     });
      else {
        res.status(200).json(solicitudActualizada);
      }
    }
  );
};

function enviarCorreoCliente(email, idFormularioCliente, fechaExpiracion) {
  const enlaceFormularioCliente = `https://joeltest.tech/formulario-cliente/${idFormularioCliente}`;
  let contenidoHtml = cargarContenidoHtml("cliente-aprobado.html");

  contenidoHtml = contenidoHtml.replace(
    "${enlaceFormularioCliente}",
    enlaceFormularioCliente
  );
  contenidoHtml = contenidoHtml.replace(
    "${fechaExpiracion.toLocaleDateString()}",
    fechaExpiracion.toLocaleDateString()
  );

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
  const enlaceFormularioCliente = `https://joeltest.tech/formulario-cliente/${idFormularioCliente}`;
  let contenidoHtml = cargarContenidoHtml("cliente-rechazado.html");

  mailer.sendEmail(
    email,
    "Solicitud de Crédito Rechazada - Nexfon",
    contenidoHtml,
    (error, info) => {
      if (error) {
        console.error("Error al enviar email de rechazo al cliente:", error);
      }
    }
  );
}

exports.crearSolicitud = (req, res) => {
  console.log("Creando solicitud:", req.body)
  const emailsContador = [
    emailContador,
    "joel.darguello@gmail.com",
    "nexfonenterprice@gmail.com",
  ];
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

    enviarCorreoContador(emailsContador, nuevaSolicitud);
    res.status(201).json(nuevaSolicitud);
  });
};

function enviarCorreoContador(emailsContador, nuevaSolicitud) {
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

  emailsContador.forEach((email) => {
    console.log("Enviando correo a:", email);
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
  });
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

exports.obtenerSolicitudes = (req, res) => {
  Solicitud.GetAllSol((error, solicitudes) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(solicitudes);
    }
  });
};

exports.getSolicitudById = (req, res) => {
  const id = req.params.id;

  Solicitud.getById(id, (err, solicitud) => {
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
