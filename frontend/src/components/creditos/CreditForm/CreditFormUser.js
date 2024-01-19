import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Alert,
  Form,
} from "react-bootstrap";
import ImageModal from "./Modal/ImageModal"; // Ajusta la ruta según sea necesario
import PdfModal from "./Modal/PdfModal";
const AddCreditForm = ({ userData, changeComponent }) => {
  console.log(userData);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  console.log(userData);
  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);

  const handleShowPdfModal = () => setShowPdfModal(true);
  const handleClosePdfModal = () => setShowPdfModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const goToCalculadora = () => {
    changeComponent("Calculadora");
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
            Datos del Credito
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre del cliente"
                    name="nombre_cliente"
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
                    name="apellido_cliente"
                    value={userData.apellido}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cédula del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese cédula del cliente"
                    name="cedula_cliente"
                    value={userData.cedula}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email del Cliente</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese email del cliente"
                    name="email_cliente"
                    value={userData.correo}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono Convencional</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese teléfono convencional"
                    name="telefono"
                    value={userData.telefono}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono Celular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese teléfono celular"
                    name="telefono_2"
                    value={userData.telefono_2}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {/* Uso del ImageModal */}
                {userData.imagen_hogar && (
                  <>
                    <h5>Imagen de la Vivienda</h5>
                    <Button
                      variant="link"
                      style={{
                        color: "white",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      onClick={handleShowImageModal}
                    >
                      Ver Imagen de la Vivienda
                    </Button>
                  </>
                )}
              </Col>
              <Col md={6}>
                {userData.rol_pago && (
                  <>
                    <h5>Rol de Pagos</h5>
                    <Button
                      variant="link"
                      style={{
                        color: "white",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      onClick={handleShowPdfModal}
                    >
                      Ver Rol de Pagos
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <Button
              variant="primary"
              style={{ borderColor: "white", textAlign: "center" }}
              type="submit"
              onClick={goToCalculadora}
            >
              Aprobar Solicitud
            </Button>
          </Form>
          <ImageModal
            show={showImageModal}
            handleClose={handleCloseImageModal}
            imageSrc={userData.imagen_hogar}
          />
          <PdfModal
            show={showPdfModal}
            handleClose={handleClosePdfModal}
            pdfSrc={userData.rol_pago}
          />
        </Card.Body>
      </Card>
      
    </Container>
  );
};

export default AddCreditForm;
