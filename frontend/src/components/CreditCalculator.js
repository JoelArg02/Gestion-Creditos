import React, { useState, useEffect } from "react";
import { Container, Card, Table, InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCalculator.css";

function CreditCalculator(props) {
  const userRole = props.userRole;
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
  }, [amountFinanced, entryQuota, monthlyQuota, term, startDate]);

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
    color: "white",
    textAlign: "center",
    padding: "10px 0",
  };
  const cellStyle = {
    textAlign: "center",
    padding: "10px 5px",
  };
  const tableCellStyle = {
    textAlign: "left",
    padding: "10px",
    border: "1px solid #ddd",
  };
  const inputGroupStyle = {
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <Container className="container my-4">
      <Card style={cardStyle}>
        <Card.Body>
          <Table responsive striped bordered hover size="sm">
            <tbody>
              <tr style={tableCellStyle}>
                <td>Valor</td>
                <td>
                  <InputGroup style={inputGroupStyle}>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={cashPrice}
                      onChange={(e) => setCashPrice(parseFloat(e.target.value))}
                    />
                  </InputGroup>
                </td>
                {userRole === 1 && (
                  <>
                    <td>Fecha de Inicio</td>
                    <td>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </td>
                    <td>Fecha Final</td>
                    <td>
                      <Form.Control type="text" value={endDate} readOnly />
                    </td>
                  </>
                )}
              </tr>
              <tr style={tableCellStyle}>
                <td>Plazo (meses)</td>
                <td>
                  <Form.Control
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
                </td>
                <td>Entrada</td>
                <td>
                  <InputGroup style={inputGroupStyle}>
                    <InputGroup.Text>%</InputGroup.Text>
                    <Form.Control
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
                  </InputGroup>
                </td>
                <td>Entrada</td>
                <td>
                  <InputGroup style={inputGroupStyle}>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" value={entryQuota} disabled />
                  </InputGroup>
                </td>
              </tr>
              {(userRole === 1 || userRole === 2) && (
                <>
                  <tr style={tableCellStyle}>
                    <td>Interés</td>
                    <td>
                      <InputGroup style={inputGroupStyle}>
                        <InputGroup.Text>%</InputGroup.Text>
                        <Form.Control type="number" value={interest} disabled />
                      </InputGroup>
                    </td>

                    <td>Cuota</td>
                    <td>
                      <InputGroup style={inputGroupStyle}>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          disabled
                          type="number"
                          value={monthlyQuota.toFixed(2)}
                        />
                      </InputGroup>
                    </td>

                    <td>Financiado</td>
                    <td>
                      <InputGroup style={inputGroupStyle}>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          value={amountFinanced.toFixed(2)}
                          disabled
                        />
                      </InputGroup>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
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
    </Container>
  );
}

export default CreditCalculator;
