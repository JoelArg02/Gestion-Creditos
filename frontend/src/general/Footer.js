import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Lógica para manejar la suscripción
  };

  
  return (
    <footer className="bg-white text-dark text-center p-4">
      <div className="my-2">
        <small>
          Servicio de Gestión de Créditos en la Nube. Todos los derechos reservados &copy; {new Date().getFullYear()} Joel Arguello
        </small>
      </div>
      <div className="my-3">
        <a href="mailto:joel.darguello@gmail.com" className="text-dark mx-2">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </a>
        <a href="https://wa.me/593998500498" className="text-dark mx-2">
          <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        </a>
        <FontAwesomeIcon icon={faCertificate} className="text-dark mx-2" size="lg" title="Certificado de Seguridad" />
      </div>

      <div className="my-3">
        <a href="/politica-de-privacidad" className="text-dark mx-2">Política de Privacidad</a>
        <a href="/terminos-y-condiciones" className="text-dark mx-2">Términos y Condiciones</a>
      </div>
    </footer>
  );
}

export default Footer;
