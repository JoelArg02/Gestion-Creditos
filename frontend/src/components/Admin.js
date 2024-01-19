import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBusinessTime,
  faClipboardList,
  faChartLine,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import UserModal from "../card/UserCard";
import BusinessModal from "../card/BusinessCard";
import { Link } from "react-router-dom";

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
    <Container className="my-5">
      <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {props.userRole === 1 || props.userRole === 2 ? (
          <>
            <Col>
              <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-between">
                <Card.Body>
                  <FontAwesomeIcon
                    icon={faUsers}
                    size="3x"
                    className="text-primary mb-3"
                    style={{ color: "#4CAF50" }}
                  />
                  <Card.Title>Usuarios</Card.Title>
                  <Card.Text>Gestionar usuarios de la plataforma.</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={handleOpenModalUsuarios}
                  >
                    Administrar Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-between">
                <Card.Body>
                  <FontAwesomeIcon
                    icon={faBusinessTime}
                    size="3x"
                    className="text-primary mb-3"
                    style={{ color: "#4CAF50" }}
                  />
                  <Card.Title>Negocios</Card.Title>
                  <Card.Text>Gestionar negocios.</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={handleOpenModalNegocios}
                  >
                    Administrar Negocios
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : null}

        <Col>
          <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-between">
            <Card.Body>
              <FontAwesomeIcon
                icon={faClipboardList}
                size="3x"
                className="text-primary mb-3"
                style={{ color: "#4CAF50" }}
              />
              <Card.Title>Solicitud</Card.Title>
              <Card.Text>Crear y gestionar solicitudes.</Card.Text>
              <Link to="/solicitudes">
                <Button
                  variant="outline-primary"
                  style={{ borderColor: "white" }}
                  className="rounded-pill"
                >
                  Ir a Solicitudes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-between">
            <Card.Body>
              <FontAwesomeIcon
                icon={faChartLine}
                size="3x"
                className="text-primary mb-3"
                style={{ color: "#4CAF50" }}
              />
              <Card.Title>Reportes</Card.Title>
              <Card.Text>Generar reportes.</Card.Text>
              <Link to="/reportes">
                <Button
                  variant="outline-primary"
                  style={{ borderColor: "white" }}
                  className="rounded-pill"
                >
                  Ir a Reportes
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-between">
            <Card.Body>
              <FontAwesomeIcon
                icon={faCreditCard}
                size="3x"
                className="mb-3"
                style={{ color: "#4CAF50" }}
              />
              <Card.Title>Crédito</Card.Title>
              <Card.Text>Asignar créditos.</Card.Text>
            </Card.Body>
            <Card.Footer className="border-top-0 bg-transparent">
              <Link to="/creditos">
                <Button
                  variant="outline-primary"
                  style={{ borderColor: "white" }}
                  className="rounded-pill"
                >
                  Asignar Crédito
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
