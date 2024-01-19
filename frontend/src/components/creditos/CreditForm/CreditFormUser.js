import React, { useState } from "react";
import { Container, Card, Row, Col, Button, Alert, Form, Modal } from "react-bootstrap";
import apiConfig from "../../../api/apiConfig"; // Asegúrate de que la ruta sea correcta

const AddCreditForm = ({ userData }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleShowModal = () => {
    const fileName = userData.rol_pago.split('/').pop(); // Extrae el nombre del archivo del URL
    const url = `${apiConfig.baseURL}/spaces/view-pdf/${fileName}`; // Construye la URL de la API
    setPdfUrl(url);
    setShowModal(true);
  };

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
          <Card.Title style={{ textAlign: "center" }}>¡Formulario de Revisión!</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Campos del formulario... */}
            {/* ... */}

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
          {pdfUrl && (
            <embed
              src={pdfUrl}
              type="application/pdf"
              style={{ width: "100%", height: "500px" }}
            />
          )}
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
