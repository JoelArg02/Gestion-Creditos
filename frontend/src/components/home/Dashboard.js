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
import { getCredits } from "../../api/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from "chart.js";
import "./Dashboard.css"; // Import your external CSS file
import Loading from "../../general/loading";
import { obtenerSolicitudesPendientes } from "../../api/solicitud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  Filler
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
function getColorForStatus(status) {
  switch (status) {
    case "Por Aprobar":
      return "bg-success";
    case "Negado":
      return "bg-danger";
    case "pendiente":
      return "bg-warning";
    default:
      return "bg-secondary";
  }
}

function Dashboard() {
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]); // Initialize as an array

  const [currentPage, setCurrentPage] = useState(1);
  const solicitudesPorPagina = 4;
  const totalPages = Math.ceil(solicitudes.length / solicitudesPorPagina);

  const getCurrentPageSolicitudes = () => {
    const startIndex = (currentPage - 1) * solicitudesPorPagina;
    return solicitudes.slice(startIndex, startIndex + solicitudesPorPagina);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  // Obtener las solicitudes de la página actual
  const solicitudesPaginadas = getCurrentPageSolicitudes();

  useEffect(() => {
    getCredits()
      .then((data) => {
        setCredits(data);
      })
      .catch((error) => {
        setError(error);
      });

    const cargarSolicitudesPendientes = async () => {
      setLoading(true);
      try {
        const response = await obtenerSolicitudesPendientes();
        setSolicitudes(response);
      } catch (error) {
        console.error("Error al obtener las solicitudes pendientes");
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitudesPendientes();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const buttonStyles = {
    enabled: {
      backgroundColor: "black", // Color cuando está habilitado
      borderColor: "white",
    },
    disabled: {
      backgroundColor: "#cccccc", // Gris claro cuando está deshabilitado
      borderColor: "white",
    },
  };

  const PaginationNumbers = ({ totalPages, currentPage, setCurrentPage }) => {
    const buttonStyle = (page) => ({
      borderColor: "white",
      margin: "0 4px",
      backgroundColor: currentPage === page ? "#cccccc" : "black", // Fondo gris claro para la página actual
    });

    return (
      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={buttonStyle(page)}
          >
            {page}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="mx-auto w-80 text-center my-custom-container">
        <h1>Bienvenidos a Nuestros Servicios de Crédito</h1>

        {error ? (
          <Alert variant="danger">Error en el servidor: {error.message}</Alert>
        ) : credits.length === 0 ? (
          <Alert variant="info">No hya creditos :S ya hay que subir</Alert>
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
                  Solicitudes pendientes
                </h6>
              </Card.Header>
              <ListGroup variant="flush">
                {solicitudesPaginadas && solicitudesPaginadas.length > 0 ? (
                  solicitudesPaginadas.map((solicitud) => (
                    <ListGroup.Item key={solicitud.id}>
                      <div className="row align-items-center justify-content-between">
                        <div className="col text-start">
                          <h6 className="mb-0">{solicitud.nombre_cliente}</h6>
                          <span>{solicitud.cedula_cliente}</span>
                          <br />
                          <span>{solicitud.email_cliente}</span>
                        </div>
                        <div className="col text-start">
                          <span>
                            Monto solicitado: {solicitud.monto_solicitado}
                          </span>
                          <br />
                          <span>Detalles: {solicitud.detalles}</span>
                        </div>

                        <div className="col-auto">
                          <span
                            className={`badge text-center ${getColorForStatus(
                              solicitud.estado
                            )}`}
                            style={{ width: "100px", borderRadius: "50px" }}
                          >
                            {solicitud.estado.charAt(0).toUpperCase() +
                              solicitud.estado.slice(1).toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>
                    No hay solicitudes disponibles
                  </ListGroup.Item>
                )}
              </ListGroup>
              <div
                className="pagination-buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={goToPreviousPage}
                  style={
                    currentPage === 1
                      ? buttonStyles.disabled
                      : buttonStyles.enabled
                  }
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Anterior
                </Button>
                <PaginationNumbers
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <Button
                  onClick={goToNextPage}
                  style={
                    currentPage === totalPages
                      ? buttonStyles.disabled
                      : buttonStyles.enabled
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
