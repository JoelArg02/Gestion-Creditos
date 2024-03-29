import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import ProfileModal from "../modal/ModalProfile";
import "./Header.css";

function Header({
  isLoggedIn,
  userId,
  userName,
  userRole,
  businessName,
  personName,
  personLastName,
  personEmail,
}) {
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
    <Navbar bg="white" expand="lg" className="shadow-sm navbar-white">
      <Container>
        <Navbar.Brand as={Link} to={businessName ? "#" : "/"}>
          {businessName || "Inicio"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                {userRole === 1 && (
                  <>
                    <Nav.Link as={Link} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  </>
                )}
                {(userRole === 1 || userRole === 2) && (
                  <Nav.Link as={Link} to="/creditos">
                  Credito
                </Nav.Link>
                )}
                {(userRole === 1 ||
                  userRole === 2 ||
                  userRole === 3 ||
                  userRole === 4) && (
                  <>
                    <Nav.Link as={Link} to="/admin">
                      Administracion
                    </Nav.Link>
                    
                  </>
                )}

                {(userRole === 1 || userRole === 2 || userRole === 4) && (
                  <>
                    <Nav.Link as={Link} to="/CreditCalculator">
                      Calcular Crédito
                    </Nav.Link>
                  </>
                )}

                {userRole === 3 && (
                  <>
                    <Nav.Link as={Link} to="/CreditCalculator">
                      Calcular Crédito
                    </Nav.Link>
                    <Nav.Link as={Link} to="/payments">
                      Cobros
                    </Nav.Link>
                  </>
                )}
                {userRole === 5 && (
                  <>
                    <Nav.Link as={Link} to="/CreditUser">
                      Ver Crédito
                    </Nav.Link>
                    <Nav.Link as={Link} to="/CreditCalculator">
                      Calcular Credito
                    </Nav.Link>
                    <Nav.Link as={Link} to="/services">
                      Servicios
                    </Nav.Link>
                    <Nav.Link as={Link} to="/products">
                      Productos
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={Link} to="/contact">
                  Contacto
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
                <Nav.Link as={Link} to="/CreditCalculator">
                  Calcular Credito
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contacto
                </Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <NavDropdown
                title={`Hola, ${personName}`}
                id="basic-nav-dropdown"
              >
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
            <>
              <Button
                variant="primary"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={() => navigate("/CreditUser")}
              >
                Ver Credito
              </Button>

              <Button
                variant="primary"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  border: "none",
                }}
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
        userId={userId}
        personName={personName}
        personLastName={personLastName}
        personEmail={personEmail}
      />
    </Navbar>
  );
}
export default Header;
