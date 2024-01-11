import React, { useEffect, useState } from "react";
import {
  Table,
  Alert,
  Button,
  Container,
  Card,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { getCredits } from "../api/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from "chart.js";
import "./Dashboard.css"; // Import your external CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

const lineChartData = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
  datasets: [
    {
      label: "Credito",
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000],
      fill: true,
      backgroundColor: "rgba(78, 115, 223, 0.2)",
      borderColor: "rgba(78, 115, 223, 1)",
      tension: 0.4, // Ajusta este valor para cambiar la curvatura de la línea
    },
    {
      label: "Pago",
      data: [0, 5000, 10000, 5000, 10000, 5000, 10000],
      fill: true,
      backgroundColor: "rgba(255, 193, 7, 0.2)",
      borderColor: "rgba(255, 193, 7, 1)",
      tension: 0.4, // Ajusta este valor para cambiar la curvatura de la línea
    },
    {
      label: "Balance",
      data: [0, 5000, 0, 10000, 0, 15000, 0],
      fill: true,
      backgroundColor: "rgba(40, 167, 69, 0.2)",
      borderColor: "rgba(40, 167, 69, 1)",
      tension: 0.4, // Ajusta este valor para cambiar la curvatura de la línea
    },
  ],
};

const creditos = [
  {
    id: 1,
    estado: "Por Aprobar",
    detalle: "Crédito de $5000",
    name: "Juan Arguello",
  },
  {
    id: 2,
    estado: "Negado",
    detalle: "Crédito de $5000",
    name: "Juan Arguello",
  },
];

function getColorForStatus(status) {
  switch (status) {
    case "Por Aprobar":
      return "bg-success";
    case "Negado":
      return "bg-danger";
    case "Pendiente":
      return "bg-warning";
    default:
      return "bg-secondary";
  }
}

function Dashboard() {
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCredits()
      .then((data) => {
        setCredits(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      <Container className="mx-auto w-80 text-center">
        <h1>Dashboard</h1>

        {error ? (
          <Alert variant="danger">Error en el servidor: {error.message}</Alert>
        ) : credits.length === 0 ? (
          <Alert variant="info">
            No hay información de créditos disponible.
          </Alert>
        ) : (
          <Table striped bordered hover></Table>
        )}
      </Container>

      <Container>
        <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
          <Col>
            <Card className="shadow mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="text-primary fw-bold m-0 text-black">
                  Ganancias Obtenidas
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="chart-area">
                  <Line data={lineChartData} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>
                <h6 className="text-primary fw-bold m-0 text-black">
                  Lista de Créditos
                </h6>
              </Card.Header>
              <ListGroup variant="flush">
                {creditos.map((credito) => (
                  <ListGroup.Item key={credito.id}>
                    <div className="row align-items-center justify-content-between">
                      <div className="col text-start">
                        <h6 className="mb-0">{credito.name}</h6>
                      </div>
                      <div className="col text-start">
                        <span className="text-xs">{credito.detalle}</span>
                      </div>

                      <div className="col-auto">
                        <span
                          className={`badge text-start ${getColorForStatus(
                            credito.estado
                          )}`}
                          style={{ width: "75px" }}
                        >
                          {credito.estado}
                        </span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
