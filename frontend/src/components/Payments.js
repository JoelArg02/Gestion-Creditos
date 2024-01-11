import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Select from "react-select";

function Payments() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userCredits, setUserCredits] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const [selectedCredit, setSelectedCredit] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [interestDue, setInterestDue] = useState(0);

  useEffect(() => {
    const fetchedUsers = [
      {
        id_usuario: "1",
        usuario: "Usuario 1",
        contrasena: "123456",
        email: "as@gmail.com",
        codigo_recuperacion: "123456",
        codigo_recuperacion_expira: "2021-10-10",
        estado: true,
        id_persona: "1",
        id_rol: "1",
        id_configuracion_negocio: "1",
      },
      {
        id_usuario: "2",
        usuario: "Usuario 2",
        contrasena: "123456",
        email: "as@gmail.com",
        codigo_recuperacion: "123456",
        codigo_recuperacion_expira: "2021-10-10",
        estado: true,
        id_persona: "2",
        id_rol: "2",
        id_configuracion_negocio: "2",
      },
    ];
    const formattedUsers = fetchedUsers.map((user) => ({
      value: user.id_usuario,
      label: `${user.usuario} - ${user.email}`,
    }));
    setUsuarios(formattedUsers);
  }, []);

  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption);
    selectedOption ? loadUserCredits(selectedOption.value) : setUserCredits([]);
  };

  const loadUserCredits = (userIdUsuario) => {
    const simulatedCredits = [
      {
        value: "1",
        userIdCrea: "1",
        userIdUsuario: "2",
        monto: 1000.0,
        plazo: 12,
        interes: 5.0,
        entrada: 100.0,
        fechaInicio: "2023-01-01",
        fechaVencimiento: "2023-12-31",
        estado: true,
        detalleCredito: 1,
      },
      {
        value: "2",
        userIdCrea: "2",
        userIdUsuario: "1",
        monto: 1200.0,
        plazo: 24,
        interes: 6.0,
        entrada: 200.0,
        fechaInicio: "2023-02-01",
        fechaVencimiento: "2024-01-31",
        estado: true,
        detalleCredito: 2,
      },
      // ... más créditos
    ];

    const userDetails = {
      nombre: "Juan",
      apellido: "Pérez",
      telefono: "0998765432",
      correo: "juan.perez@example.com",
    };

    const creditsForUser = simulatedCredits.filter(
      (credit) => credit.userIdUsuario === userIdUsuario
    );

    setUserCredits(creditsForUser);
    setSelectedCredit(null);
    setUserDetails(userDetails);
  };

  const handleCreditSelect = (credit) => {
    setSelectedCredit(credit);
  };

  const calculateInterest = (creditId, payment) => {
    const interest = parseFloat(payment) * 0.1;
    setInterestDue(interest);
  };

  const handlePaymentAmountChange = (e) => {
    const amount = e.target.value;
    setPaymentAmount(amount);
    if (selectedCredit) {
      calculateInterest(selectedCredit.value, amount);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pago procesado para:", selectedUser, selectedCredit);
  };

  const creditOptions = userCredits.map((credit) => ({
    value: credit.value,
    label: `${credit.monto}`,
  }));

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">Registrar Pago de Crédito</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Usuario</Form.Label>
                  <Select
                    options={usuarios}
                    onChange={handleUserSelect}
                    value={selectedUser}
                    placeholder="Seleccione un usuario"
                    isClearable
                    isSearchable
                  />
                </Form.Group>
                {userDetails && (
                  <div className="mb-3">
                    <h4>Detalles del Cliente</h4>
                    <p>
                      Nombre: {userDetails.nombre} {userDetails.apellido}
                    </p>
                    <p>Teléfono: {userDetails.telefono}</p>
                    <p>Correo: {userDetails.correo}</p>
                  </div>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Crédito</Form.Label>
                  <Select
                    options={creditOptions}
                    onChange={handleCreditSelect}
                    value={selectedCredit}
                    placeholder="Seleccione un crédito"
                    isClearable
                    isDisabled={!selectedUser}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Monto del Pago</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el monto del pago"
                    value={paymentAmount}
                    onChange={handlePaymentAmountChange}
                  />
                </Form.Group>
                {interestDue > 0 && <p>Interés por retraso: {interestDue}</p>}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!selectedCredit || !paymentAmount}
                >
                  Registrar Pago
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payments;
