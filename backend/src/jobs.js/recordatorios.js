// recordatorios.js
const cron = require('node-cron');
const mailer = require('../helpers/mailer'); // Asegúrate de ajustar la ruta al módulo de correo

function programarRecordatorios(email, fechaExpiracion) {
    // Calcular cuántos días faltan para la expiración
    const hoy = new Date();
    const diferenciaTiempo = fechaExpiracion.getTime() - hoy.getTime();
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

    // Programar un correo diario si faltan más de 1 día
    if (diferenciaDias > 1) {
        for (let i = 1; i < diferenciaDias; i++) {
            const fechaEnvio = new Date(hoy);
            fechaEnvio.setDate(fechaEnvio.getDate() + i);
            
            cron.schedule(`0 9 ${fechaEnvio.getDate()} ${fechaEnvio.getMonth() + 1} *`, () => {
                enviarCorreoRecordatorioDiario(email, fechaExpiracion);
            });
        }
    }

    // Programar el recordatorio final una hora antes
    const unaHoraAntes = new Date(fechaExpiracion.getTime() - 3600 * 1000);
    cron.schedule(`${unaHoraAntes.getMinutes()} ${unaHoraAntes.getHours()} ${unaHoraAntes.getDate()} ${unaHoraAntes.getMonth() + 1} *`, () => {
        enviarCorreoRecordatorioFinal(email, fechaExpiracion);
    });
}

function enviarCorreoRecordatorioDiario(email, fechaExpiracion) {
    const contenidoHtml = 'Recordatorio: su solicitud expirará pronto. Por favor complete el proceso antes del ' + fechaExpiracion.toLocaleDateString();
    // Utiliza tu módulo de correo para enviar el correo
    mailer.sendEmail(email, 'Recordatorio de Solicitud de Crédito', contenidoHtml);
}

function enviarCorreoRecordatorioFinal(email, fechaExpiracion) {
    const contenidoHtml = 'Último Recordatorio: su solicitud expirará en una hora. Por favor complete el proceso lo antes posible.';
    // Utiliza tu módulo de correo para enviar el correo
    mailer.sendEmail(email, 'Último Recordatorio de Solicitud de Crédito', contenidoHtml);
}

module.exports = { programarRecordatorios };
