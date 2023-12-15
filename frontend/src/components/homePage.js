import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';

function HomePage() {
  return (
    <div className="home-page">
      <Container style={{ maxWidth: '800px' }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Gestión de Créditos Simplificada</h3>
              <p>Descubre una nueva forma de gestionar tus créditos financieros.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Soluciones Innovadoras</h3>
              <p>Utiliza nuestra plataforma intuitiva para optimizar tus operaciones de crédito.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

    
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Seguridad de Datos</Card.Title>
                <Card.Text>
                  Protegemos tu información con la más alta seguridad.
                </Card.Text>
                <Button variant="primary">Saber más</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Análisis Avanzado</Card.Title>
                <Card.Text>
                  Herramientas de análisis para tomar mejores decisiones de crédito.
                </Card.Text>
                <Button variant="primary">Descubre</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>Acceso Fácil</Card.Title>
                <Card.Text>
                  Accede a tus datos de crédito en cualquier momento y lugar.
                </Card.Text>
                <Button variant="primary">Explorar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className="text-center py-4">
        <p>© 2023 Servicio de Gestión de Créditos en la Nube. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;
