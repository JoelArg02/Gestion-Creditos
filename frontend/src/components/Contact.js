import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario, como enviar a una API.
    alert('Mensaje enviado con éxito!');
    // Limpia el formulario después del envío
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <Container className="my-5">
      <h2>Contacto</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            placeholder="Escribe tu mensaje aquí"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
