// testMailer.js
const sendEmail = require('../helpers/mailer');

const testEmail = 'joel.darguello@gmail.com'; // Reemplaza con un email para probar
const subject = 'jajaloquioto Nodemailer';
const message = 'Esto es una prueba de Nodemailer. ¡Funciona!';

sendEmail(testEmail, subject, message);
