import React, { useEffect, useState } from "react";
import { Table, Alert, Button, Modal, Form, Container } from "react-bootstrap";
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
        <Button
          variant="primary"
          style={{ borderColor: "white" }}
          type="submit"
        >
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
    <Container className="mx-auto w-80 text-center">
      <h1>Dashboard</h1>
      <Button
        className="boton-espacio"
        variant="primary"
        style={{ borderColor: "white" }}

        onClick={() => setShowModal(true)}
      >
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
        <Table striped bordered hover></Table>
      )}
    </Container>
  );
}

export default Dashboard;
