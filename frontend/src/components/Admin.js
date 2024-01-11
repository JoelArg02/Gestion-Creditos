import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UserModal from "../card/UserCard";
import BusinessModal from "../card/BusinessCard";

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
      <Row className="my-4 justify-content-center">
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow text-center">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestionar usuarios de la plataforma.</Card.Text>
              <Button
                variant="primary"
                style={{ borderColor: "white" }}
                onClick={handleOpenModalUsuarios}
              >
                Administrar Usuarios
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow text-center">
            <Card.Body>
              <Card.Title>Negocios</Card.Title>
              <Card.Text>Gestionar negocios.</Card.Text>
              <Button
                variant="primary"
                style={{ borderColor: "white" }}
                onClick={handleOpenModalNegocios}
              >
                Administrar Negocios
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <UserModal show={showUserModal} handleClose={handleCloseUserModal} />
      <BusinessModal
        show={showBusinessModal}
        handleClose={handleCloseBusinessModal}
      />
    </Container>
  );
}

export default Admin;
