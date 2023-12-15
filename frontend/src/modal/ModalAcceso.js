import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalAcceso({ showModal, handleCloseModal }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Acceso Fácil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Entendemos la importancia de acceder a tus datos financieros de manera rápida y segura, por eso ofrecemos:</p>
        <ul>
          <li><strong>Acceso Remoto:</strong> Gestiona tus créditos desde cualquier lugar y en cualquier momento con nuestra plataforma en línea.</li>
          <li><strong>Interfaz Intuitiva:</strong> Nuestro diseño amigable facilita la navegación y la realización de operaciones financieras sin complicaciones.</li>
          <li><strong>Compatibilidad Móvil:</strong> Accede a tus datos cómodamente desde tu smartphone o tablet gracias a nuestra aplicación móvil.</li>
          <li><strong>Soporte Multicanal:</strong> Obtén ayuda y asesoramiento a través de varios canales de soporte, incluyendo chat en vivo y teléfono.</li>
        </ul>
        <p>Con nuestro servicio de Acceso Fácil, tus datos financieros están al alcance de tu mano, siempre seguros y accesibles.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAcceso;
