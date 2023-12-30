import React, { useState, useEffect } from "react";
import { addCredit, getUsers } from "../api/api"; // Asegúrate de que la ruta de importación es correcta
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ModalClientAdd from "../modal/ModalClientAdd"; // Componente del modal para añadir cliente

function AddCredito({ userId }) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [creditoData, setCreditoData] = useState({
    idUsuarioCreditoCrea: userId, // Se asigna userId al campo idUsuarioCreditoCrea
    idUsuarioCreditoUsuario: "",
    monto: "",
    interes: "",
    fechaInicio: "",
    fechaVencimiento: "",
    duracion: "",
    estado: true,
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getUsers();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes", error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setCreditoData({ ...creditoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCredit(creditoData);
      alert("Crédito creado con éxito");
    } catch (error) {
      console.error("Error al crear crédito", error);
      alert("Error al crear el crédito");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mt-4">Crear Crédito</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                as="select"
                name="idUsuarioCreditoUsuario"
                value={creditoData.idUsuarioCreditoUsuario}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_usuario} value={cliente.id}>
                    {cliente.usuario}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                name="monto"
                value={creditoData.monto}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Interés (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="interes"
                value={creditoData.interes}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="fechaInicio"
                value={creditoData.fechaInicio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaVencimiento"
                value={creditoData.fechaVencimiento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duración (meses)</Form.Label>
              <Form.Control
                type="number"
                name="duracion"
                value={creditoData.duracion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ borderColor: "white" }}
              type="submit"
            >
              Crear Crédito
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCredito;
