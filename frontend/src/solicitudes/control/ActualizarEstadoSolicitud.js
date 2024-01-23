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

    // Asegúrate de obtener el número de WhatsApp de la solicitud seleccionada
    const whatsapp_cliente = solicitudSeleccionada?.whatsapp_cliente;

    if (!whatsapp_cliente) {
      setMensaje("No se proporcionó el número de WhatsApp del cliente.");
      setLoading(false);
      return; // Detener la ejecución si no hay número de WhatsApp
    }

    try {
      // Incluye el whatsapp_cliente en la actualización
      await actualizarSolicitud(idSolicitudSeleccionada, {
        estado,
        whatsapp_cliente,
      });
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
      {/* Mensaje de alerta */}

      {mensaje && (
        <Alert
          variant={mensaje.includes("Error") ? "danger" : "success"}
          className="mensaje-alerta"
        >
          {mensaje}
        </Alert>
      )}
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
        <Card className="detalle-solicitud-card">
          <Card.Body>
            <Card.Title className="detalle-solicitud-titulo">
              Detalles de la Solicitud
            </Card.Title>
            <div className="detalle-solicitud-contenido">
              <table className="detalle-solicitud-tabla">
                <tbody>
                  <tr>
                    <th>Cliente:</th>
                    <td>
                      {solicitudSeleccionada.nombre_cliente}{" "}
                      {solicitudSeleccionada.apellido_cliente}
                    </td>
                  </tr>
                  <tr>
                    <th>Cédula:</th>
                    <td>{solicitudSeleccionada.cedula_cliente}</td>
                  </tr>
                  <tr>
                    <th>Celular:</th>
                    <td>
                      {solicitudSeleccionada.whatsapp_cliente ||
                        "No especificado"}
                    </td>
                  </tr>
                  <tr>
                    <th>Monto Solicitado:</th>
                    <td>${solicitudSeleccionada.monto_solicitado}</td>
                  </tr>
                  <tr>
                    <th>Detalles:</th>
                    <td>{solicitudSeleccionada.detalles}</td>
                  </tr>
                  <tr>
                    <th>Estado Actual:</th>
                    <td>{solicitudSeleccionada.estado}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Formulario para actualizar el estado */}

      <Form onSubmit={handleSubmit} className="formulario-estado">
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
        <div className="botones-accion">
          <Button
            variant="primary"
            type="submit"
            disabled={!idSolicitudSeleccionada || !estado}
            className="btn-actualizar"
          >
            Actualizar Estado
          </Button>
          <Button
            as="a"
            href="/solicitudes"
            variant="secondary"
            className="btn-volver"
          >
            Volver
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ActualizarEstadoSolicitud;
