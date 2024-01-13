import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';

const SolicitudVendedor = () => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    emailCliente: '',
    detalles: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', formData);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombreCliente">
          <Form.Label>Nombre del Cliente</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese nombre del cliente" 
            name="nombreCliente"
            value={formData.nombreCliente}
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailCliente">
          <Form.Label>Email del Cliente</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Ingrese email del cliente" 
            name="emailCliente"
            value={formData.emailCliente}
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="detalles">
          <Form.Label>Detalles de la Solicitud</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name="detalles"
            value={formData.detalles}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar Solicitud
        </Button>
      </Form>
    </Container>
  );
}

export default SolicitudVendedor;
