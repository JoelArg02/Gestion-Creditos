import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UserModal from "../card/UserCard";
import BusinessModal from "../card/BusinessCard";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom

function Admin(props) {
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
        {props.userRole === 1 || props.userRole === 2 ? (
          <>
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

            <UserModal
              show={showUserModal}
              handleClose={handleCloseUserModal}
            />
            <BusinessModal
              show={showBusinessModal}
              handleClose={handleCloseBusinessModal}
            />
          </>
        ) : null}

        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow text-center">
            <Card.Body>
              <Card.Title>Solicitud</Card.Title>
              <Card.Text>Gestión de solicitudes</Card.Text>

              <Card.Text>Crear y gestionar solicitudes.</Card.Text>

              <Link to="/solicitudes">
                <Button variant="primary" style={{ borderColor: "white" }}>
                  Ir a Solicitudes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow text-center">
            <Card.Body>
              <Card.Title>Reportes</Card.Title>
              <Card.Text>Gestión de reportes</Card.Text>

              <Card.Text>Generar reportes.</Card.Text>

              <Link to="/reportes">
                <Button variant="primary" style={{ borderColor: "white" }}>
                  Ir a Reportes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow text-center">
            <Card.Body>
              <Card.Title>Credito</Card.Title>
              <Card.Text>Gestión de credito</Card.Text>

              <Card.Text>Asignar Creditos</Card.Text>

              <Link to="/perfil">
                <Button variant="primary" style={{ borderColor: "white" }}>
                  Asignar Credito
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
