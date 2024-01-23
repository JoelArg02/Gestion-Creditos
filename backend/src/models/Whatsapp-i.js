const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');
const { Client } = require('whatsapp-web.js');

class WhatsappModel extends EventEmitter {
    constructor() {
        super();
        
        this.client = new Client();
        this.isReady = false;

        this.client.on('qr', (qrCode) => {
            this.qrCode = qrCode;
            this.emit('qr', qrCode);
        });

        this.client.on('ready', () => {
            this.isReady = true;
            this.emit('ready');
        });

        this.client.initialize();
    }

    

    sendMessage(to, messageContent) {
        if (this.isReady) {
            this.client.sendMessage(to, messageContent);
        } else {
            throw new Error('El cliente de WhatsApp no está listo para enviar mensajes.');
        }
    }

    // Otros métodos relevantes...
}

module.exports = WhatsappModel;
