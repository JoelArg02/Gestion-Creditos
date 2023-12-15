import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { getCredits } from "../api/api"; // Ajusta la ruta correcta a tu archivo de solicitud Axios

function Dashboard() {
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener datos de créditos cuando el componente se monta
    getCredits()
      .then((data) => {
        setCredits(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hola</p>
      {error ? (
        // Mostrar mensaje de error si ocurrió un error en la solicitud
        <Alert variant="danger">Error en el servidor: {error.message}</Alert>
      ) : credits.length === 0 ? (
        // Mostrar mensaje de "No hay información" si no hay datos de créditos
        <Alert variant="info">No hay información de créditos disponible.</Alert>
      ) : (
        // Mostrar la tabla si se obtuvieron datos de créditos
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Crédito</th>
              <th>ID Usuario Crea</th>
              <th>ID Usuario Revisa</th>
              <th>Monto</th>
              <th>Interés</th>
              <th>Fecha Inicio</th>
              <th>Fecha Vencimiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id_credito}>
                <td>{credit.id_credito}</td>
                <td>{credit.id_usuario_credito_crea}</td>
                <td>{credit.id_usuario_credito_revisa}</td>
                <td>{credit.monto}</td>
                <td>{credit.interes}</td>
                <td>{credit.fecha_inicio}</td>
                <td>{credit.FechaVencimiento}</td>
                <td>{credit.Estado ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Dashboard;
