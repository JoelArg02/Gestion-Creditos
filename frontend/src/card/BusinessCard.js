import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BusinessModal({ show, handleClose }) {
  const usuarios = [
    { id: 1, nombre: "Usuario 1" },
    { id: 2, nombre: "Usuario 2" },
    // ...otros usuarios
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nombre del negocio</Form.Label>
          <Form.Control type="text" placeholder="Nombre" />
          <Form.Group>
            <Form.Label>Usuario Responsable</Form.Label>
            <Form.Select>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Label>Lema</Form.Label>
          <Form.Control type="text" placeholder="Lema" />
          <Form.Label>Facebook</Form.Label>
          <Form.Control type="text" placeholder="Facebook" />
          <Form.Label>Instagram</Form.Label>
          <Form.Control type="text" placeholder="Instagram" />
          <Form.Label>Whatsapp</Form.Label>
          
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          style={{
            backgroundColor: "white",
            color: "black",
            borderColor: "black",
          }}
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

export default BusinessModal;
