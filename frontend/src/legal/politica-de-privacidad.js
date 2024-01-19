import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <h1>Política de Privacidad según la Legislación Ecuatoriana</h1>
      <p className="mt-3">
        Esta página resume las leyes de protección de datos personales de Ecuador y cómo nuestra empresa las cumple.
      </p>

      <Accordion defaultActiveKey="0" className="mt-4">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Ley Orgánica de Protección de Datos Personales
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              Aquí puedes detallar los aspectos más importantes de la Ley Orgánica de Protección de Datos Personales, explicando cómo la empresa se adhiere a cada uno de los puntos relevantes.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Repite este bloque para cada sección relevante de la ley */}
      </Accordion>
    </Container>
  );
};

export default PrivacyPolicy;
