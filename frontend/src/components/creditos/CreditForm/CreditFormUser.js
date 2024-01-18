import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Alert,
  Form,
  Modal,
} from "react-bootstrap";

const AddCreditForm = ({ userData }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de envío del formulario
  };

  if (!userData) {
    return <p>No se encontraron datos para la solicitud.</p>;
  }

  return (
    <Container className="custom-container-cl">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            ¡Formulario de Revisión!
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre del cliente"
                    name="nombreCliente"
                    value={userData.nombre}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese apellido del cliente"
                    name="apellidoCliente"
                    value={userData.apellido}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email del Cliente</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese email del cliente"
                    name="emailCliente"
                    value={userData.correo}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefono Convencional</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese telefono del cliente"
                    name="telefono_2"
                    value={userData.telefono}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefono Celular</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese telefono del cliente"
                    name="telefono_1"
                    value={userData.telefono_2}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefono de Referencia</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese telefono del cliente"
                    name="telefono_3"
                    value={userData.telefono_trabajo}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Direccion Hogar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese direccion del cliente"
                    name="direccion_trabajo"
                    value={userData.direccion}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese telefono del cliente"
                    name="telefono_3"
                    value={userData.ciudad}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Agrega aquí más campos del formulario si es necesario */}

            {/* Visualización de la imagen de la vivienda */}
            {userData.imagen_hogar && (
              <div>
                <h5>Imagen de la Vivienda</h5>
                <img
                  src={userData.imagen_hogar}
                  alt="Imagen de la vivienda"
                  style={{ maxWidth: "250px", height: "auto" }}
                />
              </div>
            )}

            {/* Botón para abrir el modal del rol de pagos */}
            {userData.rol_pago && (
              <div>
                <h5>Rol de Pagos</h5>
                <Button variant="link" onClick={handleShowModal}>
                  Ver Rol de Pagos
                </Button>
              </div>
            )}

            <Button variant="primary" type="submit">
              Aprobar Solicitud
            </Button>
            {/* Otros botones o acciones si son necesarios */}
          </Form>
        </Card.Body>
      </Card>
      {/* Modal para el PDF */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rol de Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed
            src={userData.rol_pago}
            type="application/pdf"
            style={{ width: "100%", height: "500px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddCreditForm;
