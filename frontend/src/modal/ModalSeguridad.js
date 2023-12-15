// En modalSeguridad.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalSeguridad({ showModal, handleCloseModal }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Seguridad de Datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>En nuestra plataforma, la seguridad de tus datos es nuestra prioridad máxima. Utilizamos las siguientes medidas para garantizar la máxima protección:</p>
        <ul>
          <li><strong>Cifrado Avanzado:</strong> Tus datos están protegidos con cifrado de última generación, asegurando que solo tú y las personas autorizadas puedan acceder a ellos.</li>
          <li><strong>Almacenamiento Seguro:</strong> Todos los datos se almacenan en servidores protegidos, con vigilancia constante y protocolos de seguridad rigurosos.</li>
          <li><strong>Monitoreo Continuo:</strong> Nuestros sistemas de monitoreo operan 24/7, identificando y respondiendo a cualquier actividad sospechosa de inmediato.</li>
          <li><strong>Respaldo Automático:</strong> Realizamos copias de seguridad automáticas para prevenir la pérdida de datos en caso de un incidente inesperado.</li>
          <li><strong>Cumplimiento Normativo:</strong> Cumplimos con todas las regulaciones de privacidad y protección de datos vigentes, incluyendo el GDPR y otros estándares internacionales.</li>
        </ul>
        <p>Con estas medidas, puedes estar seguro de que tu información está en buenas manos, permitiéndote enfocarte en lo que realmente importa: tu negocio.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSeguridad;
