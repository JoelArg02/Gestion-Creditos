import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Comprobar si existe un token en el localStorage (ajusta la clave según tu implementación)
    const token = localStorage.getItem("token");

    if (token) {
      // Si hay un token, consideramos al usuario como autenticado
      setIsLoggedIn(true);

      setUserName("Nombre del Usuario");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
         
          Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              // Mostrar "Dashboard" cuando el usuario esté autenticado
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            ) : null}
            <Nav.Link as={Link} to="/contact">
              Contactos
            </Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <div className="user-info">
              <span>Hola, {userName}</span>
            </div>
          ) : (
            <Button variant="primary" onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
