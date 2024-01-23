import React, { useState, useEffect} from "react";
import { Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import { crearSolicitud } from "../../api/solicitud";
import { CSSTransition } from "react-transition-group";
import Loading from "../../general/loading";
import "./FormularioVendedor.css";
const FormVendor = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    cedulaCliente: "",
    emailCliente: "",
    whatsappCliente: "",
    valorDinero: "",
    detalles: "",
  });
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    if (name === "cedulaCliente") {
      if (value.length === 10) {
          setError("");       
      } else {
        setError("Debe ser una cedula real");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await crearSolicitud(formData);
      console.log("Solicitud enviada:", response);
      setSuccess("Solicitud enviada con éxito");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setError("Error al enviar solicitud");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Card className="mt-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <CSSTransition
            in={!!error}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <Alert variant="danger">{error}</Alert>
          </CSSTransition>

          <CSSTransition
            in={!!success}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <Alert variant="success">{success}</Alert>
          </CSSTransition>

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
                  required
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
                  value={formData.apellidoCliente}
                  onChange={handleChange}
                  required
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
                  placeholder="Ingrese cédula del cliente (10 números)"
                  name="cedulaCliente"
                  value={formData.cedulaCliente}
                  onChange={handleChange}
                  maxLength="10"
                  pattern="\d*"
                  required
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Numero Celular</Form.Label>
                <Form.Control
                  type="number"
                  name="whatsappCliente"
                  value={formData.whatsappCliente}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Valor del Producto solicitado</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el valor del producto en efectivo"
                  name="valorDinero"
                  value={formData.valorDinero}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Detalles de los productos</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="detalles"
              value={formData.detalles}
              onChange={handleChange}
              
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 btn-custom">
            Enviar Solicitud
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default FormVendor;
