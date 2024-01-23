const WhatsappModel = require("../models/Whatsapp-i");
const qrcode = require("qrcode-terminal");

// Inicializa la instancia de WhatsappModel
const whatsapp = new WhatsappModel();

// Función para formatear el número de teléfono
function formatPhoneNumber(phoneNumber) {
  const formattedNumber = phoneNumber.startsWith("0")
    ? phoneNumber.substring(1)
    : phoneNumber;
  return `593${formattedNumber}@s.whatsapp.net`;
}

// Controlador de WhatsApp
const whatsappController = {
  // Función para obtener el código QR
  getQRCode: (req, res) => {
    if (whatsapp.isReady) {
      res.json({ message: "El cliente de WhatsApp ya está listo." });
    } else if (whatsapp.qrCode) {
      qrcode.generate(whatsapp.qrCode, { small: true });
      res.json({
        qrCode: "Escanee el código QR con WhatsApp para iniciar sesión.",
      });
    } else {
      res
        .status(503)
        .json({ error: "Código QR no disponible, intente nuevamente." });
    }
  },

  // Función para enviar mensajes de WhatsApp
  sendMessage: (to, message) => {
    return new Promise((resolve, reject) => {
      if (!whatsapp.isReady) {
        reject("El cliente de WhatsApp no está listo para enviar mensajes.");
        return;
      }

      const formattedNumber = formatPhoneNumber(to);
      whatsapp.client.sendMessage(formattedNumber, message)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
};

module.exports = whatsappController;
