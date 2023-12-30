import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalClientAdd(props) {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    email: '',
  });

  const handleChange = (e) => {
    setClienteData({ ...clienteData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí añadir lógica para enviar datos al backend
    props.onHide(); // Cierra el modal
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Añadir Cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={clienteData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Repite para otros campos */}
          <Button variant="primary" type="submit">
            Guardar Cliente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalClientAdd;
