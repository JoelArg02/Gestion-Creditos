const Solicitud = require("../models/solicitud");
const { v4: uuidv4 } = require("uuid");
const mailer = require("../helpers/mailer");

exports.crearSolicitud = (req, res) => {
  const idFormularioCliente = uuidv4(); // Generar UUID
  const datosSolicitud = { ...req.body, idFormularioCliente };

  Solicitud.crear(datosSolicitud, (err, nuevaSolicitud) => {
    if (err) {
      return res
        .status(500)
        .send("Error al crear la solicitud: " + err.message);
    }
    const enlaceFormularioCliente = `https://joeltest.tech/formulario-cliente/${idFormularioCliente}`;
    const emailCliente = nuevaSolicitud.email_cliente; // Asegúrate de que este campo coincida con tu modelo
    const asuntoEmail = "Complete su solicitud";
    const contenidoHtml = `
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2>Complete su Solicitud</h2>
          <p>Por favor complete su solicitud haciendo clic en el siguiente enlace:</p>
          <a href="${enlaceFormularioCliente}" class="btn">Completar Solicitud</a>
        </div>
      </body>
    </html>
    `;
    mailer.sendEmail(
      emailCliente,
      asuntoEmail,
      contenidoHtml,
      (error, info) => {
        if (error) {
          console.error("Error al enviar email:", error);
          // Puedes optar por enviar una respuesta diferente aquí si el envío de email es crítico
        }
      }
    );

    res.status(201).json(nuevaSolicitud);
  });
};

exports.getSolicitudByFormularioId = (req, res) => {
  const formularioId = req.params.id;

  Solicitud.getByFormularioId(formularioId, (error, solicitud) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    res.status(200).json(solicitud);
  });
};
