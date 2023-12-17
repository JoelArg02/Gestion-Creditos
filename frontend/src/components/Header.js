import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Modal,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
} from "react-bootstrap";
import ProfileModal from "../modal/ProfileModal";

function Header({ isLoggedIn, userName, businessName }) {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  const navigate = useNavigate();

  const handleSupportClick = () => {
    navigate("/soporte");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" expand="lg" className="shadow-sm navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {businessName || "Inicio"}{" "}
          {/* Display "Inicio" if businessName is empty */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
                <Nav.Link as={Link} to="/add-credit">
                  Añadir Crédito
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/services">
                  Servicios
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contactos
                </Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <NavDropdown title={`Hola, ${userName}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleProfileClick}>
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleSupportClick}>
                  Soporte o Ayuda
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutClick}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Button variant="primary" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
        userName={userName}
        // Aquí puedes pasar otros props necesarios al modal de perfil
      />
    </Navbar>
  );
}

export default Header;
