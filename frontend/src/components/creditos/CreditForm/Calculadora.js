import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  InputGroup,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../components/CreditCalculator.css";

function CreditCalculator(props) {
  const userRole = props.userRole;
  const [amortizationData, setAmortizationData] = useState([]);
  const [cashPrice, setCashPrice] = useState(10);
  const [entryPercentage, setEntryPercentage] = useState(30);
  const [term, setTerm] = useState(1);
  const [interest, setInterest] = useState(15);
  const [monthlyQuota, setMonthlyQuota] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [amountFinanced, setAmountFinanced] = useState(0);
  const [amountFinance, setAmountFinance] = useState(0);
  const [entryQuota, setEntryQuota] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    let newInterest;
    if (term === 1) newInterest = 15;
    else if (term === 2) newInterest = 16;
    else if (term === 3) newInterest = 17;
    else if (term === 4 || term === 5) newInterest = 22;
    else if (term === 6 || term === 7) newInterest = 25;
    else newInterest = 30;
    setInterest(newInterest);
  }, [term]);

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

      for (let month = 0; month <= term; month++) {
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
  }, [amountFinanced, entryQuota, monthlyQuota, term, startDate, endDate]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const calculateEndDate = () => {
    let date = new Date(startDate);
    date.setMonth(date.getMonth() + term);
    setEndDate(formatDate(date));
  };
  useEffect(() => {
    calculateEndDate();
  }, [startDate, term, endDate]);

  const cardStyle = {
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px",
    textAlign: "center",
  };
  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#007bff",
  };
  const tableStyles = {
    marginTop: "30px",
    boxShadow: "0 0 4px 0.2px rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
  };
  const headerStyles = {
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
  };
  const cellStyle = {
    textAlign: "center",
    padding: "10px 5px",
  };

  const goToContract = () => {
    const formData = {
      cashPrice,
      entryPercentage,
      term,
      interest,
      monthlyQuota,
      amountFinanced,
      amountFinance,
      entryQuota,
      startDate,
      endDate,
    };
  
    const updatedAmortizationData = [...amortizationData];

    updatedAmortizationData.push(formData);

    props.setAmortizationData(updatedAmortizationData);

    props.changeComponent("Contratos");

  };

  const goToCreditForm = () => {
    props.changeComponent("CreditForm");
  };

  return (
    <Container className="card-custom">
      <Card style={cardStyle}>
        <Card.Body>
          <h4 style={{ color: "#007bff" }}>Credito Calculador</h4>

          {/* Primera Fila */}
          <div className="row-custom">
            <div className="col-custom">
              <span className="label-custom">Valor</span>
              <div className="form-field-container">
                <InputGroup className="input-group-custom">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    className="input-custom"
                    type="number"
                    value={cashPrice}
                    onChange={(e) => setCashPrice(parseFloat(e.target.value))}
                  />
                </InputGroup>
              </div>
            </div>

            <div className="col-custom">
              <span className="label-custom">Plazo (en meses)</span>
              <div className="select-wrapper">
                <Form.Control
                  className="select-custom"
                  as="select"
                  value={term}
                  onChange={(e) => setTerm(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Control>
                <FontAwesomeIcon icon={faChevronDown} className="select-icon" />
              </div>
            </div>
          </div>

          {/* Segunda Fila */}
          <div className="row-custom">
            <div className="col-custom">
              <>
                <span className="label-custom">Fecha de Inicio</span>
                <div className="form-field-container">
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </>

              <>
                <span className="label-custom">Cuota</span>
                <div className="form-field-container">
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      disabled
                      type="number"
                      value={monthlyQuota.toFixed(2)}
                    />
                  </InputGroup>
                </div>
              </>

              <>
                <span className="label-custom">Interés</span>
                <div className="form-field-container">
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text>%</InputGroup.Text>
                    <Form.Control type="number" value={interest} disabled />
                  </InputGroup>
                </div>
              </>
            </div>

            <div className="col-custom">
              <>
                <span className="label-custom">Fecha Final</span>
                <div className="form-field-container">
                  <Form.Control type="text" value={endDate} disabled />
                </div>
              </>

              <span className="label-custom">Entrada</span>
              <div className="form-field-container">
                <InputGroup className="input-group-custom">
                  <InputGroup.Text>%</InputGroup.Text>
                  <div className="select-wrapper">
                    <Form.Control
                      className="select-custom"
                      as="select"
                      value={entryPercentage}
                      onChange={(e) =>
                        setEntryPercentage(parseFloat(e.target.value))
                      }
                    >
                      {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(
                        (percentage) => (
                          <option key={percentage} value={percentage}>
                            {percentage}
                          </option>
                        )
                      )}
                    </Form.Control>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="select-icon"
                    />
                  </div>
                </InputGroup>
              </div>
              <>
                <span className="label-custom">Total Financiado</span>
                <div className="form-field-container">
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={amountFinanced.toFixed(2)}
                      disabled
                    />
                  </InputGroup>
                </div>
              </>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div style={tableStyles}>
        <h3 style={headerStyle}>Tabla de Pagos</h3>
        <Table responsive striped bordered hover size="sm">
          <thead style={headerStyles}>
            <tr>
              <th>Mes</th>
              <th>Pago</th>
              <th>Faltante</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {amortizationSchedule.map((row, index) => (
              <tr key={index}>
                <td style={cellStyle}>{row.month}</td>
                <td style={cellStyle}>${row.payment}</td>
                <td style={cellStyle}>${row.balance}</td>

                <td style={cellStyle}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="primary" onClick={goToContract}>
        Cargar Credito
      </Button>
    </Container>
  );
}

export default CreditCalculator;
