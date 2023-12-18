import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UserModal from "../card/UserCard"; // Importa los modales aquí
import BusinessModal from "../card/BusinessCard"; // Importa los modales aquí

function Admin() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const handleOpenModalUsuarios = () => {
    setShowUserModal(true);
  };

  const handleOpenModalNegocios = () => {
    setShowBusinessModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  const handleCloseBusinessModal = () => {
    setShowBusinessModal(false);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={4} className="mb-4"> {/* Cambio en el tamaño de la columna */}
          <Card className="shadow" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestionar usuarios de la plataforma.</Card.Text>
              <Button variant="primary" onClick={handleOpenModalUsuarios}>
                Administrar Usuarios
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4"> {/* Cambio en el tamaño de la columna */}
          <Card className="shadow" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Negocios</Card.Title>
              <Card.Text>Gestionar negocios.</Card.Text>
              <Button variant="primary" onClick={handleOpenModalNegocios}>
                Administrar Negocios
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <UserModal show={showUserModal} handleClose={handleCloseUserModal} />
      <BusinessModal show={showBusinessModal} handleClose={handleCloseBusinessModal} />
    </Container>
  );
}

export default Admin;
