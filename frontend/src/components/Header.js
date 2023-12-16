import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function Header({ isLoggedIn, userName }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
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
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            ) : null}
            <Nav.Link as={Link} to="/admin">
                Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/services">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contactos
            </Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <div className="user-info">
              <span>Hola, {userName}</span>
              <Button variant="primary" onClick={() => handleLogoutClick()}>
                Cerrar Sesión
              </Button>
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
