import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./CreditUser.css"; // Importa tu CSS personalizado
import { getCredit } from "../api/api"; // Asegúrate de que la ruta de importación sea correcta

function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString();
}

function CreditUser({ personDni }) {
  const [cedula, setCedula] = useState(personDni || "");
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si se pasa una cédula como prop, se obtienen los datos del crédito al cargar el componente
    if (personDni) {
      fetchCreditData(personDni);
    }
  }, [personDni]);

  const fetchCreditData = async (cedula) => {
    setLoading(true);
    try {
      const data = await getCredit(cedula);
      setCreditData(data);
    } catch (error) {
      console.error("Error al obtener datos del crédito:", error);
    } finally {
      setLoading(false);
    }
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
    return (
      <Container className="justify-content-center align-items-center container-2">
        <Row className="justify-content-center">
          <Col md={12} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
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
                    <button type="submit" className="btn btn-primary btn-block">
                      Revisar
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (creditData && creditData.length > 0) {
    return (
      <Container className="justify-content-center align-items-center container-2">
        <Row className="justify-content-center">
          <Col md={12}>
            <h2>Datos del Crédito</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Solicitante</th> {/* Agregar encabezado para el nombre */}
                  <th>Monto</th>
                  <th>Interés</th>
                  <th>Duracion</th>
                  <th>Faltante</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {creditData.map((credito) => (
                  <tr key={credito.id_credito}>
                    <td>
                      {credito.nombre} {credito.apellido}
                    </td>{" "}
                    {/* Mostrar nombre y apellido */}
                    <td>{credito.monto}</td>
                    <td>{credito.interes}</td>
                    <td>Sapo</td>
                    <td>Sapo2</td>
                    <td>{formatFecha(credito.fecha_inicio)}</td>
                    <td>{formatFecha(credito.fecha_vencimiento)}</td>
                    <td>{credito.estado ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }

  // Retornar un mensaje o componente en caso de que no se cumplan las condiciones anteriores
  return <div>No se encontraron datos para mostrar.</div>;
}

export default CreditUser;
