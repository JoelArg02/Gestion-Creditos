const axios = require('axios');

// Configuración de la API de WhatsApp
const whatsappConfig = {
    url: 'https://api.whatsapp.com/v1/messages', // URL de la API de WhatsApp
    token: 'EAAQGBokxQZAUBO3ZBKQIgoAwEMkkj2qZAnBsVHeI608HEAZC1qprWuTkYio2aDyNjKthPtrfq7lKttxaHMKIEUjCZBR5Fn2AiAATSxRi5tpjVXWcQ9b2IHdsjyqIQgOdPM0VUrZAbZC6NUBMONVsz0h58OBq6LyNV49ZBxD80ouI8i8Rnk1AFimf34OMqLKKFoRvCiSUWxrqpvxqFOeZBaXDWTle8mElZBbjuZCgjEZD', // Token de acceso de la API de WhatsApp
};

exports.sendMessage = async (recipient, message) => {
    try {
        const response = await axios.post(whatsappConfig.url, {
            to: recipient,
            type: 'text',
            text: { body: message }
        }, {
            headers: { 'Authorization': `Bearer ${whatsappConfig.token}` }
        });g

        console.log('Mensaje enviado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
};
