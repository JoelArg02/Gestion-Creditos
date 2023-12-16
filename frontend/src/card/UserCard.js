import React from 'react';
import { Card, Button } from 'react-bootstrap';

function UserCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Usuarios</Card.Title>
        <Card.Text>
          Gestionar usuarios de la plataforma.
        </Card.Text>
        <Button variant="primary" href="/admin/users">Administrar Usuarios</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;