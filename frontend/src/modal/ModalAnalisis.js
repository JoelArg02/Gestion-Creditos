import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAnalisis({ showModal, handleCloseModal }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Análisis Avanzado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Nuestro servicio de Análisis Avanzado proporciona herramientas
          poderosas para tomar decisiones de crédito informadas:
        </p>
        <ul>
          <li>
            <strong>Reportes Detallados:</strong> Genera informes detallados que
            te ayudan a comprender mejor el comportamiento de tus créditos.
          </li>
          <li>
            <strong>Análisis Predictivo:</strong> Utiliza el poder del análisis
            predictivo para anticipar tendencias y tomar decisiones proactivas.
          </li>
          <li>
            <strong>Visualización de Datos:</strong> Con nuestras herramientas
            de visualización, transforma tus datos en gráficos y cuadros fáciles
            de interpretar.
          </li>
          <li>
            <strong>Integración de Datos:</strong> Integra datos de diferentes
            fuentes para obtener una visión completa de tu cartera de créditos.
          </li>
        </ul>
        <p>
          Con estas capacidades, puedes maximizar la eficiencia de tus
          operaciones de crédito y adelantarte a las necesidades del mercado.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAnalisis;
