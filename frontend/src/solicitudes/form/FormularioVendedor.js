import React, { useState, useEffect, useContext} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { ValidationContext } from "../../contexts/ValidationContext";
import { crearSolicitud } from "../../api/solicitud";
import { CSSTransition } from "react-transition-group";

import Loading from "../../general/loading";

const FormVendor = () => {
  const { isValidCI } = useContext(ValidationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    cedulaCliente: "",
    emailCliente: "",
    valorDinero: "",
    detalles: "",
  });
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    if (name === "cedulaCliente") {
        if (value.length === 10) {
            const validationResponse = isValidCI(value);
            if (!validationResponse.isValid) {
                console.log(validationResponse.message); // O mostrar en la UI
                setError("La cédula es inválida, debe ser una cédula real.");
            } else {
                setError("");
            }
        } else {
            setError("");
        }
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await crearSolicitud(formData);
      console.log("Solicitud enviada:", response);
      setSuccess("Solicitud enviada con éxito");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setError("Error al enviar solicitud");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <CSSTransition
        in={!!error}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Alert variant="danger">{error}</Alert>
      </CSSTransition>

      <CSSTransition
        in={!!success}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Alert variant="success">{success}</Alert>
      </CSSTransition>

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
        <Form.Label>Apellido del Cliente</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombre del cliente"
          name="apellidoCliente"
          value={formData.apellidoCliente}
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
        <Form.Label>Valor del Producto solicitado</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el valor del producto en efectivo"
          name="valorDinero"
          value={formData.valorDinero}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Detalles de los productos</Form.Label>
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
