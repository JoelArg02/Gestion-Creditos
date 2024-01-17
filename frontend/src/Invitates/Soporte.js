import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

function SoportePage() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Página de Soporte</h1>

      <section>
        <h2 className="mb-3">Preguntas Frecuentes</h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                ¿Cómo puedo cambiar mi contraseña?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                Aquí va la respuesta sobre cómo cambiar la contraseña. Puedes proporcionar detalles específicos o enlaces a guías más detalladas aquí.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>

    </Container>
  );
}

export default SoportePage;