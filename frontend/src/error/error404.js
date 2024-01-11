import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./error404.css"; 

function Error404({ isAuthenticated }) { 
  
  return (
    <Container className="error404-container custom-container">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="text-center">
          <h1 className="error-title">Error 404: Página No Encontrada</h1>
          <p className="error-description">
            La página que estás intentando ver no existe o ha sido movida.
          </p>
          {isAuthenticated ? (
            <Button
              variant="primary"
              style={{ borderColor: "white" }}
              className="error-button"
              as={Link}
              to="/"
            >
              Volver a la página de inicio
            </Button>
          ) : (
            <Button
              variant="primary"
              className="error-button"
              style={{ borderColor: "white" }}
              as={Link}
              to="/login"
            >
              Iniciar sesión
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Error404;
