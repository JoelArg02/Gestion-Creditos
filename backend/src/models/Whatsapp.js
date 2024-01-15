const axios = require('axios');

// Configuración de la API de WhatsApp
const whatsappConfig = {
    url: 'https://graph.facebook.com/v18.0/161805513693041/messages',
    token: 'EAAQGBokxQZAUBO3ZBKQIgoAwEMkkj2qZAnBsVHeI608HEAZC1qprWuTkYio2aDyNjKthPtrfq7lKttxaHMKIEUjCZBR5Fn2AiAATSxRi5tpjVXWcQ9b2IHdsjyqIQgOdPM0VUrZAbZC6NUBMONVsz0h58OBq6LyNV49ZBxD80ouI8i8Rnk1AFimf34OMqLKKFoRvCiSUWxrqpvxqFOeZBaXDWTle8mElZBbjuZCgjEZD', // Token de acceso de la API de WhatsApp
};

exports.sendMessage = async (recipient, message) => {
    try {
        const response = await axios.post(whatsappConfig.url, {
            messaging_product: "whatsapp", // Añade esta línea
            to: recipient,
            type: 'text',
            text: { body: message }
        }, {
            headers: { 'Authorization': `Bearer ${whatsappConfig.token}` }
        });

        console.log('Mensaje enviado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
};


exports.sendMessageTemplate = async (recipient, templateName, languageCode) => {
    try {
        const response = await axios.post(whatsappConfig.url, {
            messaging_product: "whatsapp",
            to: recipient,
            type: "template",
            template: {
                name: templateName,
                language: {
                    code: languageCode
                }
            }
        }, {
            headers: { 'Authorization': `Bearer ${whatsappConfig.token}`, 'Content-Type': 'application/json' }
        });

        console.log('Mensaje de plantilla enviado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el mensaje de plantilla:', error);
        throw error;
    }
};
