const whatsappModel = require('../models/Whatsapp');

exports.sendMessage = async (req, res) => {
    const { recipient, message } = req.body;

    if (!recipient || !message) {
        return res.status(400).send({ error: 'Faltan datos requeridos: recipient o message.' });
    }

    try {
        const response = await whatsappModel.sendMessage(recipient, message);
        res.status(200).send({ success: true, response: response });
    } catch (error) {
        console.error('Error en el controlador al enviar el mensaje:', error);
        res.status(500).send({ error: 'Error al enviar el mensaje.' });
    }
};


exports.webhook = (req, res) => {
    console.log('Webhook recibido:', req.body);

    res.status(200).send('Evento recibido');
};
exports.sendTemplateMessage = async (req, res) => {
    const { recipient, templateName, languageCode } = req.body;

    if (!recipient || !templateName || !languageCode) {
        return res.status(400).send({ error: 'Faltan datos requeridos: recipient, templateName o languageCode.' });
    }

    try {
        const response = await whatsappModel.sendMessageTemplate(recipient, templateName, languageCode);
        res.status(200).send({ success: true, response: response });
    } catch (error) {
        console.error('Error en el controlador al enviar el mensaje de plantilla:', error);
        res.status(500).send({ error: 'Error al enviar el mensaje de plantilla.' });
    }
};

exports.sendTemplateMessage = async (req, res) => {
    const { recipient, templateName, languageCode } = req.body;

    if (!recipient || !templateName || !languageCode) {
     
        return res.status(400).send({ error: 'Faltan datos requeridos: recipient, templateName o languageCode.' });
    }

    try {
        const response = await whatsappModel.sendMessageTemplate(recipient, templateName, languageCode);
        res.status(200).send({ success: true, response: response });
    } catch (error) {
        console.error('Error en el controlador al enviar el mensaje de plantilla:', error);
        res.status(500).send({ error: 'Error al enviar el mensaje de plantilla.' });
    }
};