import React, { useState } from "react";
import SolicitudVendedor from "./form/FormularioVendedor";
import ActualizarEstadoSolicitud from "./control/ActualizarEstadoSolicitud";
import { Container, Card, Col, Row, Button } from "react-bootstrap";

const Home = ({ userRole }) => {
  const esAdmin = userRole === 1;
  const esContador = userRole === 2;
  const esCobrador = userRole === 3;
  const esVendedor = userRole === 4;

  // Estado para controlar qué componente se muestra
  const [mostrarVendedor, setMostrarVendedor] = useState(false);
  const [mostrarContador, setMostrarContador] = useState(false);
  const ResumenEstadisticas = () => (
    <Row className="my-4">
      <Col md={4}>
        <Card className="text-center shadow">
          <Card.Body>
            <Card.Title>Total Solicitudes</Card.Title>
            <Card.Text>50</Card.Text>
            {/* Puedes poner aquí contenido dinámico */}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow">
          <Card.Body>
            <Card.Title>Créditos Aprobados</Card.Title>
            <Card.Text>30</Card.Text>
            {/* Puedes poner aquí contenido dinámico */}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow">
          <Card.Body>
            <Card.Title>Créditos Pendientes</Card.Title>
            <Card.Text>20</Card.Text>
            {/* Puedes poner aquí contenido dinámico */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Container>
      <h1 className="text-center my-4">Panel de Gestión</h1>

      {esAdmin && !mostrarVendedor && !mostrarContador && (
        <div className="d-flex flex-row justify-content-center">
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Panel del Vendedor</Card.Title>
              <Card.Text>Crear y gestionar solicitudes.</Card.Text>
              <Button
                variant="primary"
                style={{ borderColor: "white" }}
                onClick={() => setMostrarVendedor(true)}
              >
                Ir al Panel
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>Panel del Contador</Card.Title>
              <Card.Text>Revisar y actualizar estado de solicitudes.</Card.Text>
              <Button
                variant="primary"
                style={{ borderColor: "white" }}
                onClick={() => setMostrarContador(true)}
              >
                Ir al Panel
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}

      {esAdmin && !mostrarVendedor && !mostrarContador && (
        <>
          <ResumenEstadisticas />
          <div className="d-flex flex-row justify-content-center">
            {/* Tus tarjetas de Panel */}
          </div>
        </>
      )}

      {esVendedor || esCobrador || (esAdmin && mostrarVendedor) ? (
        <SolicitudVendedor />
      ) : null}
      {esContador || (esAdmin && mostrarContador) ? (
        <ActualizarEstadoSolicitud />
      ) : null}
    </Container>
  );
};

export default Home;
