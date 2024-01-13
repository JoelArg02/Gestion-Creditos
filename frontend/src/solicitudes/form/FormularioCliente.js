import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { getSolicitudById } from "../../api/solicitud";
import "./FormularioCliente.css";
import Loading from "../../general/loading";

const FormularioCliente = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombreCliente: "",
    emailCliente: "",
    detalles: "",
    emailCliente: "",
    cedulaCliente: "",
    direccionHogar: "",
  });

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(file);
    } else {
      alert("Por favor, sube un archivo PDF.");
      setSelectedPdf(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    } else {
      alert("Por favor, sube una imagen en formato PNG o JPEG.");
      setSelectedImage(null);
      setPreviewImageUrl(null);
    }
  };

  useEffect(() => {
    const cargarDatosFormulario = async () => {
      setLoading(true);
      try {
        const datos = await getSolicitudById(id);
        setFormData({
          nombreCliente: datos.nombre_cliente,
          emailCliente: datos.email_cliente,
          detalles: datos.detalles,
          emailCliente: datos.email_cliente,
          cedulaCliente: datos.cedula_cliente,

          direccionHogar: "", // Este campo lo dejarás vacío para que el cliente lo complete
        });
      } catch (error) {
        console.error("Error al cargar los datos del formulario:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosFormulario();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="custom-container-cl">
      <Card>
        <Card.Body>
          <Card.Title>Formulario de Aprobación</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre del cliente"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email del Cliente</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese email del cliente"
                    name="emailCliente"
                    value={formData.emailCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cedula</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cedula"
                    name="cedulaCliente"
                    value={formData.cedulaCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Numero Celular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Numero Celular"
                    name="cedulaCliente"
                    value={formData.cedulaCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Calle Principal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    name="direccionHogar"
                    value={formData.direccionHogar}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Calle Secundaria</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    name="direccionHogar"
                    value={formData.direccionHogar}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    name="direccionHogar"
                    value={formData.direccionHogar}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la dirección"
                    name="direccionHogar"
                    value={formData.direccionHogar}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <h4>Referencias laborables</h4>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre trabajo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefono trabajo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Telefono"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol de Pagos en PDF</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                  />
                  {selectedPdf && (
                    <p>Archivo seleccionado: {selectedPdf.name}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Foto de la vivienda</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                  {selectedImage && (
                    <p>Archivo seleccionado: {selectedImage.name}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {previewImageUrl && (
                <Card>
                  <Card.Header>Vista Previa de la Imagen</Card.Header>
                  <Card.Body>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={previewImageUrl}
                        alt="Vista previa"
                        style={{ maxWidth: "250px", height: "auto" }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Row>

            <Button
              variant="primary"
              style={{ borderColor: "white", marginTop: "1rem" }}
              type="submit"
            >
              Completar Solicitud
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormularioCliente;
