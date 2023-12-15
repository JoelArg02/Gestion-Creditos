import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Ruta a la que quieres redirigir para iniciar sesión
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* Aquí puedes agregar un <img> con tu logo si tienes uno */}
          Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
            {/* Agrega más enlaces según sea necesario */}
          </Nav>
          <Button variant="primary" onClick={handleLoginClick}>Iniciar Sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
