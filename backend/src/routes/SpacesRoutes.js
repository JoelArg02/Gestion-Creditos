const express = require('express');
const multer = require('multer');
const SpacesController = require('../controllers/SpacesController');

const router = express.Router();
const upload = multer(); // Configura multer según tus necesidades
const spacesController = new SpacesController();

// Ruta para subir archivos
router.post('/upload', upload.single('file'), (req, res) => {
    spacesController.upload(req, res);
});

// Ruta para descargar archivos
router.get('/download/:fileName', (req, res) => {
    spacesController.download(req, res);
});

// Nueva ruta para visualizar archivos PDF
router.get('/view-pdf/:fileName', (req, res) => {
    spacesController.viewPdf(req, res);
});

module.exports = router;
