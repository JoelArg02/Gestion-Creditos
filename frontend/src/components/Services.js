import React from 'react';

const servicios = [
    {
      id: 1,
      nombre: "Consultoría de Créditos",
      descripcion: "Asesoramiento experto para optimizar tus opciones de crédito y finanzas.",
      icono: "icono-consultoria.png",
    },
    {
      id: 2,
      nombre: "Análisis Financiero",
      descripcion: "Análisis detallado de tu situación financiera para tomar decisiones informadas.",
      icono: "icono-analisis.png",
    },
    {
      id: 3,
      nombre: "Gestión de Riesgos",
      descripcion: "Identificación y gestión de riesgos para proteger tus inversiones.",
      icono: "icono-riesgos.png",
    },
    {
        id: 4,
        nombre: "Seguimiento de Créditos",
        descripcion: "Monitorea el estado y el rendimiento de tus créditos en tiempo real.",
        icono: "icono-seguimiento.png",
      },
      {
        id: 5,
        nombre: "Informes Personalizados",
        descripcion: "Obtén informes detallados y personalizados para una visión clara de tus operaciones de crédito.",
        icono: "icono-informes.png",
      },
      {
        id: 6,
        nombre: "Integración Contable",
        descripcion: "Sincroniza tus datos de crédito con tus sistemas contables para una gestión eficiente.",
        icono: "icono-integracion.png",
      },
      {
        id: 7,
        nombre: "Alertas y Notificaciones",
        descripcion: "Recibe alertas en tiempo real para mantenerte informado sobre cualquier cambio importante en tus créditos.",
        icono: "icono-alertas.png",
      },
      {
        id: 8,
        nombre: "Asistencia Legal y Normativa",
        descripcion: "Asesoría legal para garantizar que tus operaciones de crédito cumplan con las normativas vigentes.",
        icono: "icono-legal.png",
      },
      {
        id: 9,
        nombre: "Soporte Técnico",
        descripcion: "Soporte técnico especializado para resolver cualquier inconveniente con la plataforma.",
        icono: "icono-soporte.png",
      }
    ];  
  

function Servicios() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Servicios</h2>
      <div className="row">
        {servicios.map(servicio => (
          <div key={servicio.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={servicio.icono} className="card-img-top" alt={servicio.nombre} />
              <div className="card-body">
                <h3 className="card-title">{servicio.nombre}</h3>
                <p className="card-text">{servicio.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
