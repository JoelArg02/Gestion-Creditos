import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProfileModal({ show, handleClose, userName, userEmail }) {
  const [newPassword, setNewPassword] = useState('');

  const handleEdit = () => {
    console.log("Iniciar proceso de edición");
    // Aquí debes agregar la lógica para enviar la nueva contraseña al backend
    console.log("Nueva contraseña:", newPassword);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Perfil del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Nombre: {userName}</p>
        <p>Email: {userEmail}</p>
        <Form>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
