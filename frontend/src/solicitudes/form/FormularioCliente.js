import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { getSolicitudById } from "../../api/solicitud";
import "./FormularioCliente.css";
import Loading from "../../general/loading";

const FormularioCliente = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombreCliente: "",
    emailCliente: "",
    detalles: "",
    emailCliente: "",
    cedulaCliente: "",
    direccionHogar: "",
  });

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
        console.log("Datos del formulario cargados:", datos);
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
    console.log("Datos del formulario enviados:", formData);
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
                  <Form.Label>Dirección del Hogar</Form.Label>
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
                  <Form.Label>Detalles</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="detalles"
                    value={formData.detalles}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              style={{ borderColor: "white" }}
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
