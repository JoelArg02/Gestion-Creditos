import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./error404.css";

function Error404() {
  return (
    <Container className="error404-container mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="display-4 error-title text-effect">Error 404</h1>
          <p className="lead text-appear">La página que buscas no existe.</p>
          <p className="text-appear-delay">
            Lo sentimos, pero la página que estás buscando no se encuentra en
            este sitio.
          </p>
          <Button
            variant="primary"
            className="custom-button hover-effect"
            as={Link}
            to="/"
          >
            Ir a la página de inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Error404;