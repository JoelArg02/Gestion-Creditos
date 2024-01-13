import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Table,
  Row,
  Col,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import "./CreditUser.css";
import { getCredit } from "../api/api";
import { getPago } from "../api/pago";
import Loading from "../general/loading";

function CreditUser({ personDni, userRole }) {
  const [cedula, setCedula] = useState(personDni || "");
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  const [cashPrice, setCashPrice] = useState();
  const [entryPercentage, setEntryPercentage] = useState(30);
  const [amountFinance, setAmountFinance] = useState(0);
  const [term, setTerm] = useState(1);
  const [interest, setInterest] = useState();
  const [monthlyQuota, setMonthlyQuota] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [amountFinanced, setAmountFinanced] = useState(0);
  const [entryQuota, setEntryQuota] = useState(0);
  // const [payments, setPayments] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");

  const fetchCreditData = async (cedula) => {
    setLoading(true);
    try {
      const data = await getCredit(cedula);
      setCreditData(data);
      setErrorSearch("");
      if (data && data.length > 0) {
        const credito = data[0];
        setCashPrice(Number(credito.monto));
        setEntryPercentage(Number(credito.entrada));
        setTerm(Number(credito.plazo));
        setStartDate(credito.fecha_inicio);
        setInterest(Number(credito.interes));
      }
    } catch (error) {
      setErrorSearch("Error al obtener datos del credito");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);

      try {
        const data = await getPago(creditData[0].id_credito); // Supongo que getPago recibe el ID del crédito
        // setPayments(data);
        console.log(data);
      } catch (error) {
        setErrorSearch("Error al obtener los pagos");
      } finally {
        setLoading(false);
      }
    };

    if (creditData && creditData.length > 0) {
      fetchPayments();
    }
  }, [creditData]);

  const calculateCuotaStatus = (cuota) => {
    if (cuota.pago) {
      return "Pagada";
    } else {
      const currentDate = new Date();
      const cuotaDate = new Date(cuota.fecha_pago);
      if (cuotaDate > currentDate) {
        return "Pendiente";
      } else {
        const daysDifference = Math.floor(
          (currentDate - cuotaDate) / (1000 * 60 * 60 * 24)
        );
        if (daysDifference <= 30) {
          return "Atrasada";
        } else {
          return "En Abogado";
        }
      }
    }
  };
  useEffect(() => {
    const entryQuotaCal = (cashPrice * entryPercentage) / 100;
    setEntryQuota(entryQuotaCal);
    const amountFinance = cashPrice - entryQuota;
    setAmountFinance(amountFinance);
    const interes = (100 - interest) / 100;
    const amountFinanced = amountFinance / interes;
    setAmountFinanced(amountFinanced);
    const quotaMonthly = amountFinanced / term;
    setMonthlyQuota(quotaMonthly);
  }, [
    cashPrice,
    entryPercentage,
    term,
    interest,
    amountFinanced,
    amountFinance,
    entryQuota,
    monthlyQuota,
  ]);

  useEffect(() => {
    const calculateAmortization = () => {
      let schedule = [];
      let remainingBalance = amountFinanced;
      let date = new Date(startDate);

      for (let month = 0; month - 1 <= term; month++) {
        schedule.push({
          month: month === 0 ? "Entrada" : month,
          payment:
            month === 0 ? entryQuota.toFixed(2) : monthlyQuota.toFixed(2),
          balance: remainingBalance.toFixed(2),
          date: formatDate(date),
        });

        if (month > 0) {
          remainingBalance -= monthlyQuota;
        }
        date.setMonth(date.getMonth() + 1);
      }

      setAmortizationSchedule(schedule);
    };

    calculateAmortization();
  }, [amountFinanced, entryQuota, monthlyQuota, term, startDate]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // const calculateEndDate = () => {
  //   let date = new Date(startDate);
  //   date.setMonth(date.getMonth() + term);
  //   setEndDate(formatDate(date));
  // };

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
      color: "white",
      textAlign: "center",
      padding: "10px 0",
    };

    const rowHoverStyle = {
      "&:hover": {
        backgroundColor: "#f2f2f2",
        cursor: "pointer",
      },
    };

    const cellStyle = {
      textAlign: "center",
      padding: "10px 5px",
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
                <th>Fecha de Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} style={rowHoverStyle}>
                  <td style={cellStyle}>{row.month}</td>
                  <td style={cellStyle}>${row.payment}</td>
                  <td style={cellStyle}>{row.date}</td>
                  <td style={cellStyle}>${row.balance}</td>
                  <td style={cellStyle}>{calculateCuotaStatus(row)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {userRole === 1 && (
          <Button variant="primary" onClick={handleReturn}>
            Regresar
          </Button>
          )}
        </div>
      </Container>
    );
  }
  return <div>No se encontraron datos para mostrar.</div>;
}

export default CreditUser;
