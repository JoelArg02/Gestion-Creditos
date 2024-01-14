// s3config.js
const AWS = require('aws-sdk');
const config = require('./config/config'); // Asume que tienes un archivo config.js

const spacesEndpoint = new AWS.Endpoint(config.digitalOcean.spaceEndPoint);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: config.digitalOcean.accessKeyId,
    secretAccessKey: config.digitalOcean.secretAccessKey
});

module.exports = s3;
