import React, { useEffect, useState } from "react";
import { Table, Alert, Button, Modal, Form } from "react-bootstrap";
import { getCredits } from "../api/api";
import "./Dashboard.css"; // Import your external CSS file

function AddCreditModal({ show, handleClose, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Crédito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>{/* Add form fields here */}</Form>
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
    <div className="dashboard-container text-center"> {/* Add "text-center" class */}
      <h1>Dashboard</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Crédito
      </Button>
      <AddCreditModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleAddCredit}
      />
      {error ? (
        <Alert variant="danger">Error en el servidor: {error.message}</Alert>
      ) : credits.length === 0 ? (
        <Alert variant="info">No hay información de créditos disponible.</Alert>
      ) : (
        <Table striped bordered hover>
          {/* Table content here */}
        </Table>
      )}
    </div>
  );
}

export default Dashboard;
