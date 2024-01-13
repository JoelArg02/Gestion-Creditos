import React from 'react';
import SolicitudVendedor from './form/FormularioVendedor';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Genera Consulta</h1>
      <SolicitudVendedor />
    </Container>
  );
}

export default Home;
