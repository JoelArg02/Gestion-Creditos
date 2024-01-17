import React, { useState, useEffect } from "react";
import "./Contratos.css";

const HtmlViewer = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("contrato-1.html")
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
    <div style={{width:"800px"}}>
      <div className="html-viewer-container">
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <button onClick={handlePrint}>Imprimir</button>
      </div>
    </div>
  );
};

export default HtmlViewer;
