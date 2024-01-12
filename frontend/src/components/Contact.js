import React, { useState } from "react";
import {
  Container,
  Modal,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faPaperPlane,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Contact.css"; // Asegúrate de que la ruta es correcta
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { emailContacto } from "../api/mailer";
import Loading from "../general/loading";

function Contact() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    suscripcion: false,
  });
  const [loading, setLoading] = useState(false);

  let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = defaultIcon;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowModal();
  };

  const handleConfirmSend = async () => {
    setLoading(true);
    handleCloseModal();
    try {
      const response = await emailContacto(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const position = [-0.13399177553844804, -78.47931000480955];
  if (loading) {
    return <Loading />;
  }
  return (
    <Container className="my-5">
      <Card className="contact-card">
        <Card.Header className="contact-header custom-color">
          Contacto
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form onSubmit={handleSubmit} className="contact-form">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} /> Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>
                    <FontAwesomeIcon icon={faPhone} /> Teléfono
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ingresa tu teléfono"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicMessage">
                  <Form.Label>
                    <FontAwesomeIcon icon={faCommentDots} /> Mensaje
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Escribe tu mensaje aquí"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    name="suscripcion"
                    checked={formData.suscripcion}
                    onChange={handleChange}
                    label="Suscríbete a nuestro boletín informativo"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} /> Enviar
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <div className="map-container">
                <MapContainer
                  center={position}
                  zoom={17}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>Aquí está nuestro negocio.</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted contact-footer">
          Gracias por contactarnos!
        </Card.Footer>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres enviar este mensaje?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSend}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;
