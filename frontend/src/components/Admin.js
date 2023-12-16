import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from '../card/UserCard'; // Asegúrate de importar tus tarjetas aquí

function Admin() {
  return (
    <Container>
      <Row className="my-4">
        <Col md={3}>
          <UserCard />
        </Col>
        <Col md={3}>
        </Col>
        <Col md={3}>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
