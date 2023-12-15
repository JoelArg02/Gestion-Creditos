import React from 'react';
import { Card, Button, Container, Col } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Products.css'; // Asegúrate de crear este archivo CSS

const planes = [
  {
    id: 1,
    nombre: 'Plan Básico',
    caracteristicas: [
      'Análisis de crédito mensual',
      'Acceso a herramientas básicas de gestión de créditos',
      'Soporte por correo electrónico'
    ],
  },
  {
    id: 2,
    nombre: 'Plan Avanzado',
    caracteristicas: [
      'Análisis de crédito semanal',
      'Integración con sistemas contables',
      'Soporte telefónico y por correo electrónico'
    ],
  },
  {
    id: 3,
    nombre: 'Plan Premium',
    caracteristicas: [
      'Análisis de crédito diario',
      'Consultoría personalizada',
      'Acceso a todas las nuevas características y actualizaciones',
      'Soporte prioritario'
    ],
  }
];

function Productos() {
    return (
      <Container className="my-5">
        <h2 className="text-center mb-4">Nuestros Planes de Servicio</h2>
        <TransitionGroup className="row">
          {planes.map(plan => (
            <CSSTransition key={plan.id} timeout={500} classNames="item">
              <Col md={4} className="mb-4">
                <Card className="h-100 card-hover">
                  <Card.Body>
                    <Card.Title>{plan.nombre}</Card.Title>
                    <Card.Text>
                      {plan.caracteristicas.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary">Contratar</Button>
                  </Card.Footer>
                </Card>
              </Col>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
  
  export default Productos;