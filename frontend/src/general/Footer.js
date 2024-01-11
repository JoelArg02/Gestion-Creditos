import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-white text-dark text-center p-3">
      <div>
        Servicio de Gestión de Créditos en la Nube. Todos los derechos reservados &copy; Joel Arguello
      </div>
      <div>
        <a href="mailto:joel.darguello@gmail.com" className="text-dark" style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="https://wa.me/593998500498" className="text-dark">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
