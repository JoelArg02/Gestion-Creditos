import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState } from "react";
import { login } from "../api/api";
import ModalPasswordHelp from "../modal/ModalPasswordHelp";

function Login(props) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.usuario || !formData.contrasena) {
      setError("Debes ingresar un usuario y una contraseña");
      return;
    }

    try {
      const data = await login(formData.usuario, formData.contrasena);
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      setError(
        "Error al iniciar sesión: usuario inexistente o contraseña incorrecta"
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="my-5">
            <Card.Header className="text-center">Iniciar sesión</Card.Header>
            <Card.Body>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu usuario"
                      aria-label="Usuario"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu contraseña"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="mb-3 text-center">
                  <a onClick={handleOpenModal}>¿Olvidaste tu contraseña?</a>
                </div>
                <Button variant="dark" type="submit" className="w-100">
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>{" "}
      {isModalOpen && <ModalPasswordHelp onClose={handleModalClose} />}
    </Container>
  );
}

export default Login;
