const nodemailer = require('nodemailer');

// Configuración de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'nexfonec123@gmail.com',
      clientId: '967394478850-ho3clgo567dcu24dculqkvnn3jmcn9ed.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04RSBmpTIvII0CgYIARAAGAQSNwF-L9Irt8cS_u6pgf4F2CjArOIEo-8H389IW1dBeuw2KUJcPBDwV4ZfoBp1b9lYDlCWSe4OlNg'
    }
});

exports.sendRecoveryCode = (email, code, callback) => {
  const mailOptions = {
    from: 'nexfonec123@gmail.com',
    to: email,
    subject: 'Código de Recuperación de Contraseña',
    text: `Tu código de recuperación es: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar email:', error);
      return callback(error, null); // Pasamos el error al callback
    }
    callback(null, info); // Pasamos la información del envío exitoso al callback
  });
};
