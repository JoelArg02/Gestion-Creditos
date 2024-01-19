import React from "react";
import { Modal, Button } from "react-bootstrap";

const ImageModal = ({ show, handleClose, imageSrc }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Imagen de la Vivienda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={imageSrc} alt="Imagen de la vivienda" style={{ width: "100%", height: "auto" }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
