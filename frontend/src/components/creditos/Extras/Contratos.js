import React, { useState, useEffect } from "react";
import "./Contratos.css";
// Asegúrate de haber importado Bootstrap en tu proyecto.
// import 'bootstrap/dist/css/bootstrap.min.css';

const HtmlViewer = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("https://nf-xfc-dt.nyc3.digitaloceanspaces.com/b76d18f2-8cfc-4fa7-bf15-d5b87aabd0c6.html")
      .then((response) => response.text())
      .then((html) => setHtmlContent(html))
      .catch((error) => console.error("Error al cargar el archivo:", error));
  }, []);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
          <button className="btn btn-success" >Generar Crédito</button>
          <button className="btn btn-primary" onClick={handlePrint}>Imprimir</button>
        </div>
      </div>
    </div>
  );
};

export default HtmlViewer;
