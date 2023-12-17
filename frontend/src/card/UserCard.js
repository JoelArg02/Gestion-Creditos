import React from "react";
import { Modal, Button } from "react-bootstrap";

function UserCard({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>{<p>Hola</p>}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {}
      </Modal.Footer>
    </Modal>
  );
}

export default UserCard;
