import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCredits } from "../api/api";


function UserCard({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" />
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" />
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Correo" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          style={{ backgroundColor: "white", color: "black", borderColor: 'black' }}
        >
          Registrar
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {}
      </Modal.Footer>
    </Modal>
  );
}

export default UserCard;
