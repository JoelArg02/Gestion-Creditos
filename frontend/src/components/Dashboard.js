import React, { useEffect, useState } from "react";
import { Table, Alert, Button, Modal, Form } from "react-bootstrap";
import { getCredits } from "../api/api";  
import './Dashboard.css';


function AddCreditModal({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Crédito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Agrega campos de formulario según tu modelo de datos */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" type="submit">
          Guardar Crédito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Dashboard() {
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCredits()
      .then((data) => {
        setCredits(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleAddCredit = (event) => {
    event.preventDefault();

    setShowModal(false);
  };

  return (

    <div className="containerDashboard">
      <h1>Dashboard</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Crédito
      </Button>
      <AddCreditModal show={showModal} handleClose={() => setShowModal(false)} handleSubmit={handleAddCredit} />
      {error ? (
        <Alert variant="danger">Error en el servidor: {error.message}</Alert>
      ) : credits.length === 0 ? (
        <Alert variant="info">No hay información de créditos disponible.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Crédito</th>
              <th>ID Usuario Crea</th>
              <th>ID Usuario Revisa</th>
              <th>Monto</th>
              <th>Interés</th>
              <th>Fecha Inicio</th>
              <th>Fecha Vencimiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id_credito}>
                <td>{credit.id_credito}</td>
                <td>{credit.id_usuario_credito_crea}</td>
                <td>{credit.id_usuario_credito_revisa}</td>
                <td>{credit.monto}</td>
                <td>{credit.interes}</td>
                <td>{credit.fecha_inicio}</td>
                <td>{credit.FechaVencimiento}</td>
                <td>{credit.Estado ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Dashboard;
