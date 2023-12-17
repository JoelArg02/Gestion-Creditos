import React from "react";
import { Modal, Button } from "react-bootstrap";

function BusinessModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Negocios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {<p>Hola</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {/* Agrega botones o acciones específicas para la administración de Negocios */}
      </Modal.Footer>
    </Modal>
  );
}

export default BusinessModal;
