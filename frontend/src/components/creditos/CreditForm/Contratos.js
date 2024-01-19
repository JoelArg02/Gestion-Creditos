import React, { useState, useEffect } from "react";
import "./Contratos.css";
import { Loading } from "../../../general/loading";
const HtmlViewer = (props) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("contrato-1.html")
      .then((response) => response.text())
      .then((html) => {
        // Reemplazar los marcadores de posición en el HTML con datos reales
        let newHtml = html
          .replace(/\$\{NOMBRE_NEGOCIO\}/g, props.userData.nombreNegocio)
          .replace(/\$\{NUMERO_RUC\}/g, props.userData.numeroRuc)
          .replace(/\$\{CEDULA\}/g, props.userData.cedula)
          .replace(/\$\{NOMBRE\}/g, props.userData.nombre)
          .replace(/\$\{APELLIDO\}/g, props.userData.apellido)
          .replace(/\$\{Elementos\}/g, props.userData.detalles)
          .replace(/\$\{DIRECCION\}/g, props.userData.direccion)
          .replace(/\$\{TELEFONO\}/g, props.userData.telefono)
          .replace(/\$\{CORREO\}/g, props.userData.correo)
          .replace(/\$\{fecha\}/g, getFormattedDate());

        // Generar la tabla de amortización como una cadena de texto
        const amortizationTable = generateAmortizationTable(
          props.amortizationData
        );

        // Reemplazar el marcador de posición en el HTML
        newHtml = newHtml.replace(
          /<div id="tabla-amortizacion">(.*?)<\/div>/s,
          `<div id="tabla-amortizacion">${amortizationTable}</div>`
        );

        setHtmlContent(newHtml);
      })
      .catch((error) => console.error("Error al cargar el archivo:", error));
  }, [props.userData, props.amortizationData]);


  function getFormattedDate() {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `Quito, ${dia} de ${mes}, ${año}`;
}

  const calculateNextMonthDate = (currentDate, monthsToAdd) => {
    const date = new Date(currentDate); // Convierte la fecha actual en un objeto Date
    date.setMonth(date.getMonth() + monthsToAdd); // Suma el número de meses
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Suma 1 ya que los meses se indexan desde 0
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    return formattedDate;
  };

  function generateAmortizationTable(amortizationData) {
    if (!amortizationData || amortizationData.length === 0) {
      return ""; // Si no hay datos, retornamos una cadena vacía
    }

    let tableHtml = `
      <table>
        <tr>
          <th>Cuota</th>
          <th>Fecha de Pago</th>
          <th>Monto de Cuota</th>
          <th>Capital</th>
        </tr>
    `;
    console.log(amortizationData);
    for (let i = 0; i < amortizationData[0].term + 1; i++) {
      const cuota = i === 0 ? "Entrada" : i;
      const fechaPago = calculateNextMonthDate(
        amortizationData[0].startDate,
        i
      );
      const montoCuota =
        typeof amortizationData[0].monthlyQuota === "number"
          ? i === 0
            ? "$ " + amortizationData[0].entryQuota.toFixed(2) // Mostrar entryQuota en el primer mes
            : "$ " + amortizationData[0].monthlyQuota.toFixed(2) // Mostrar monthlyQuota en los meses siguientes
          : "";

      const capital =
        typeof amortizationData[0].amountFinanced === "number"
          ? "$" +
            (
              amortizationData[0].amountFinanced -
              i * amortizationData[0].monthlyQuota
            ).toFixed(2)
          : "";

      tableHtml += `
        <tr>
          <td>${cuota}</td>
          <td>${fechaPago}</td>
          <td>${montoCuota}</td>
          <td>${capital}</td>
        </tr>
      `;
    }

    tableHtml += `
      </table>
    `;

    return tableHtml;
  }

  const handlePrint = () => {
    // Abrir una ventana nueva y cargar el contenido HTML generado
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const goToCalculadora = () => {
    // Cambiar al componente de la Calculadora
    props.changeComponent("Calculadora");
  };

  return (
    <div className="container my-4">
      <div className="html-viewer-container">
        <iframe
          srcDoc={htmlContent}
          title="Contrato"
          style={{ width: "100%", height: "600px" }}
          frameBorder="0"
        ></iframe>
        <div className="d-flex justify-content-between my-2">
          <button className="btn btn-success">Generar Crédito</button>
          <button className="btn btn-primary" onClick={goToCalculadora}>
            Volver
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default HtmlViewer;
