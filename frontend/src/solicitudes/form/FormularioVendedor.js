import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { crearSolicitud } from "../../api/solicitud"; // Asegúrate de que la ruta sea correcta
import Loading from "../../general/loading";

const FormVendor = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreCliente: "",
    cedulaCliente: "",
    emailCliente: "",
    valorDinero: "",
    detalles: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await crearSolicitud(formData);
      console.log("Solicitud enviada:", response);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre del Cliente</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del cliente"
          name="nombreCliente"
          value={formData.nombreCliente}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cédula del Cliente</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese cédula del cliente (10 números)"
          name="cedulaCliente"
          value={formData.cedulaCliente}
          onChange={handleChange}
          maxLength="10"
          pattern="\d*"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email del Cliente</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese email del cliente"
          name="emailCliente"
          value={formData.emailCliente}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Valor del Crédito</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el valor del crédito"
          name="valorDinero"
          value={formData.valorDinero}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Detalles de la Solicitud</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="detalles"
          value={formData.detalles}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" style={{ borderColor: "white" }} type="submit">
        Enviar Solicitud
      </Button>
    </Form>
  );
};

export default FormVendor;
