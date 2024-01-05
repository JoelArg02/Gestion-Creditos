import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Row, Col, Card, Alert } from "react-bootstrap";
import "./CreditUser.css";
import { getCredit } from "../api/api";
import Loading from "../general/loading";

function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString();
}

function CreditUser({ personDni }) {
  const [cedula, setCedula] = useState(personDni || "");
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  const [cashPrice, setCashPrice] = useState();
  const [entryPercentage, setEntryPercentage] = useState(30);
  const [term, setTerm] = useState(1);
  const [interest, setInterest] = useState();
  const [monthlyQuota, setMonthlyQuota] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [amountFinanced, setAmountFinanced] = useState(0);
  const [entryQuota, setEntryQuota] = useState(0);

  const fetchCreditData = async (cedula) => {
    setLoading(true);
    try {
      const data = await getCredit(cedula);
      setCreditData(data);
      console.log(data);
      setErrorSearch("");
      if (data && data.length > 0) {
        const credito = data[0];
        setCashPrice(Number(credito.monto));
        setEntryPercentage(Number(credito.entrada));
        setTerm(Number(credito.plazo));
        setInterest(Number(credito.interes));
      }
      
    } catch (error) {
      setErrorSearch("Error al obtener datos del credito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    const amountFinance = (interest * cashPrice) / 100 + cashPrice;
    console.log(interest, cashPrice, amountFinance);
    setAmountFinanced(amountFinance);
    const entryQuotaCal = (entryPercentage * amountFinance) / 100;
    setEntryQuota(entryQuotaCal);

    const monthlyQuotaCal = (amountFinance - entryQuota) / term;
    setMonthlyQuota(monthlyQuotaCal);
  });

  useEffect(() => {
    const calculateAmortization = () => {
      let schedule = [];
      let remainingBalance = amountFinanced - entryQuota;

      schedule.push({
        month: "Entrada ",
        payment: entryQuota.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
      for (let month = 1; month <= term; month++) {
        let interestPayment = (interest * remainingBalance) / 100;
        let principalPayment = monthlyQuota;
        remainingBalance = remainingBalance - principalPayment;

        schedule.push({
          month: month,
          payment: monthlyQuota.toFixed(2),
          balance: remainingBalance.toFixed(2),
        });
      }

      setAmortizationSchedule(schedule);
    };

    calculateAmortization();
  }, [amountFinanced, entryQuota, monthlyQuota, term, interest]);

  useEffect(() => {
    if (personDni) {
      fetchCreditData(personDni);
    }
  }, [personDni]);

  const handleReturn = (e) => {
    setCedula("");
    setCreditData("");
  };

  const handleCedulaChange = (e) => {
    const newCedula = e.target.value;
    setCedula(newCedula);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cedula.length === 10) {
      fetchCreditData(cedula);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!personDni && !creditData) {
    return (
      <Container className="justify-content-center align-items-center container-2">
        <Row>
          <Col md={6} lg={4}>
            <Card className="shadow-card" style={{ width: "25rem" }}>
              <Card.Body>
                <h1 className="text-center">¡Revisa tu crédito!</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="cedulaNumber" className="form-label">
                      Número de Cédula:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cedulaNumber"
                      value={cedula}
                      onChange={handleCedulaChange}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      style={{ borderColor: "white" }}
                      className="btn btn-primary btn-block"
                    >
                      Revisar
                    </button>
                  </div>
                  {errorSearch && (
                    <Alert variant="danger" className="mt-3">
                      {errorSearch}
                    </Alert>
                  )}
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (creditData && creditData.length > 0) {
    const cardStyle = {
      backgroundColor: "#f8f9fa",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      marginTop: "20px",
    };

    const headerStyle = {
      textAlign: "center",
      marginBottom: "20px",
      color: "#007bff",
    };
    const tableStyles = {
      marginTop: "30px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
    };

    const headerStyles = {
      backgroundColor: "#007bff",
      color: "white", // Color del texto del encabezado
      textAlign: "center",
      padding: "10px 0",
    };

    const rowHoverStyle = {
      "&:hover": {
        backgroundColor: "#f2f2f2", // Color de fondo al pasar el mouse
        cursor: "pointer",
      },
    };

    const cellStyle = {
      textAlign: "center", // Alineación del texto en las celdas
      padding: "10px 5px", // Espaciado dentro de las celdas
    };

    const tableCellStyle = {
      textAlign: "left",
      padding: "10px",
      border: "1px solid #ddd",
    };

    // Estilos para los controles de entrada
    const inputGroupStyle = {
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    };
    return (
      <Container className="container my-4">
        <div style={tableStyles}>
          <h3 style={headerStyle}>Tabla de Pagos</h3>
          <Table responsive striped bordered hover size="sm">
            <thead style={headerStyles}>
              <tr>
                <th>Mes</th>
                <th>Pago</th>
                <th>Faltante</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} style={rowHoverStyle}>
                  <td style={cellStyle}>{row.month}</td>
                  <td style={cellStyle}>${row.payment}</td>
                  <td style={cellStyle}>${row.balance}</td>
                  <td style={cellStyle}>Estado</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
  return <div>No se encontraron datos para mostrar.</div>;
}

export default CreditUser;
