import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import {
  actualizarSolicitud,
  obtenerSolicitudesPendientes,
} from "../../api/solicitud";
import Loading from "../../general/loading";
import "./ActualizarEstadoSolicitud.css";

const ActualizarEstadoSolicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [idSolicitudSeleccionada, setIdSolicitudSeleccionada] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarSolicitudesPendientes = async () => {
      setLoading(true);
      try {
        const solicitudesPendientes = await obtenerSolicitudesPendientes();
        setSolicitudes(solicitudesPendientes);
      } catch (error) {
        console.error("Error al obtener las solicitudes pendientes", error);
        setMensaje("Error al cargar las solicitudes pendientes.");
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitudesPendientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await actualizarSolicitud(idSolicitudSeleccionada, { estado });
      setMensaje(`Se actualizó el estado a ${estado}.`);
      setIdSolicitudSeleccionada("");
      setEstado("");
    } catch (error) {
      console.error("Error al actualizar el estado", error);
      setMensaje("Error al actualizar el estado.");
    } finally {
      setLoading(false);
    }
  };

  const solicitudSeleccionada = solicitudes.find(
    (s) => s.id.toString() === idSolicitudSeleccionada
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Solicitud Pendiente</Form.Label>
        <Form.Select
          value={idSolicitudSeleccionada}
          onChange={(e) => setIdSolicitudSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una Solicitud</option>
          {solicitudes.map((solicitud) => (
            <option key={solicitud.id} value={solicitud.id}>
              {`${solicitud.nombre_cliente} ${solicitud.apellido_cliente} - ${solicitud.cedula_cliente} - $${solicitud.monto_solicitado}`}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {solicitudSeleccionada && (
        <Card>
          <Card.Body>
            <Card.Title>Detalles de la Solicitud</Card.Title>
            <Card.Text>
              <strong>Cliente:</strong>{" "}
              {`${solicitudSeleccionada.nombre_cliente} ${solicitudSeleccionada.apellido_cliente}`}
              <br />
              <strong>Cédula:</strong> {solicitudSeleccionada.cedula_cliente}
              <br />
              <strong>Monto Solicitado:</strong> $
              {solicitudSeleccionada.monto_solicitado}
              <br />
              <strong>Detalles:</strong> {solicitudSeleccionada.detalles}
              <br />
              <strong>Estado Actual:</strong> {solicitudSeleccionada.estado}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Seleccione un Estado</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!idSolicitudSeleccionada || !estado}
        >
          Actualizar Estado
        </Button>
        <Button
          as="a"
          href="/solicitudes"
          className="custom-buttom"
          variant="secondary"
        >
          Volver
        </Button>
      </Form>
      {mensaje && (
        <Alert
          variant={mensaje.includes("Error") ? "danger" : "success"}
          className="mt-3"
        >
          {mensaje}
        </Alert>
      )}
    </>
  );
};

export default ActualizarEstadoSolicitud;
