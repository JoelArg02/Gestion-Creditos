const SpacesModel = require("../models/SpacesModel");

class SpacesController {
  constructor() {
    // Configura aquí el nombre de tu bucket si es necesario
    this.model = new SpacesModel("nf-xfc-dt"); // Reemplaza 'nf-xfc-dt' con tu nombre de bucket
  }

  // Método para subir un archivo
  async upload(req, res) {
    try {
      // Asume que 'file' es el campo en tu formulario de subida
      const file = req.file;

      // Llama al método de subida de tu modelo
      const result = await this.model.uploadFile(
        file.buffer,
        file.originalname
      );

      res
        .status(200)
        .json({ message: "Archivo subido con éxito", data: result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al subir el archivo", error: error.message });
    }
  }

  // Método para descargar un archivo
  async download(req, res) {
    try {
      const fileName = req.params.fileName; // Obtiene el nombre del archivo de los parámetros de la ruta

      // Llama al método de descarga de tu modelo
      const fileBuffer = await this.model.downloadFile(fileName);

      res.status(200).send(fileBuffer);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al descargar el archivo",
          error: error.message,
        });
    }
  }

  // Métodos adicionales para actualizar, eliminar y listar archivos
  // ...
  async viewPdf(req, res) {
    try {
      const fileName = req.params.fileName; // Obtiene el nombre del archivo de los parámetros de la ruta

      // Llama al método getFileStream de tu modelo
      const fileStream = await this.model.getFileStream(fileName);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + fileName + '"'
      );
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error serving PDF file: ", error);
      res
        .status(500)
        .json({
          message: "Error al visualizar el archivo PDF",
          error: error.message,
        });
    }
  }
}

module.exports = SpacesController;
