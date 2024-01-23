const nodemailer = require("nodemailer");

// Configuración de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "nexfonec123@gmail.com",
    clientId:
      "967394478850-ho3clgo567dcu24dculqkvnn3jmcn9ed.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04mf3FM8XKxgtCgYIARAAGAQSNwF-L9IrHp3QXqDCfqIl-SexOE8djsnS2Dvm9MHX7og3nQ3CJsfpVnKxHeEGYuXYk3A0wt17ulI",
  },
});

exports.sendContactEmail = (email, subject, htmlContent, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: "joel.darguello@gmail.com",
    subject: subject,
    html: htmlContent, // Usar html en lugar de text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email pilas:", error);
      return callback(error, null);
    }
    callback(null, info);
  });
};

exports.sendRecoveryCode = (email, code, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: email,
    subject: "Código de Recuperación de Contraseña",
    text: `Tu código de recuperación es: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email:", error);
      return callback(error, null); // Pasamos el error al callback
    }
    callback(null, info); // Pasamos la información del envío exitoso al callback
  });
};

exports.sendLoginNotification = (email, ip, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: email,
    subject: "Notificación de Inicio de Sesión",
    text: `Se ha iniciado sesión desde la IP: ${ip} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email de notificación:", error);
      return callback(error, null);
    }
    callback(null, info);
  });
};

exports.sendEmail = (email, subject, htmlContent, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: email,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email:", error);
      return callback(error, null);
    }
    callback(null, info);
  });
};
