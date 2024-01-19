import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PdfModal = ({ show, handleClose, pdfSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(show);

  useEffect(() => {
    setIsModalOpen(show);
  }, [show]);

  // Función para modificar la URL del PDF
  const modifyPdfUrl = (url) => {
    if (!url) return '';
    return url.replace("nyc3.digitaloceanspaces.com", "nyc3.cdn.digitaloceanspaces.com");
  };

  const modifiedPdfSrc = modifyPdfUrl(pdfSrc);

  return (
    <Modal show={isModalOpen} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Rol de Pagos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modifiedPdfSrc ? (
          <iframe src={modifiedPdfSrc} width="100%" height="500px" />
        ) : (
          <p>No se ha proporcionado un archivo PDF.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PdfModal;
