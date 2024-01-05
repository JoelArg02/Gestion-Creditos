import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container className="justify-content-center align-items-center container-2">
      <Row className="justify-content-center">
        <Col md={12} className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
