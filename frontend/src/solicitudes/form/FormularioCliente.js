import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { getSolicitudById } from "../../api/solicitud";
import { uploadFile } from "../../api/files";
import { createUser } from "../../api/user";
import { createReference } from "../../api/reference";
import { createPerson } from "../../api/person";
import "./FormularioCliente.css";
import Loading from "../../general/loading";

const FormularioCliente = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    detalles: "",
    cedulaCliente: "",
    direccionHogar: "",
    telefono_2: "",
    ciudad: "",
    provincia: "",
    nombre_trabajo: "",
  });

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(file);
    } else {
      alert("Por favor, sube un archivo PDF.");
      setSelectedPdf(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    } else {
      alert("Por favor, sube una imagen en formato PNG o JPEG.");
      setSelectedImage(null);
      setPreviewImageUrl(null);
    }
  };

  useEffect(() => {
    const cargarDatosFormulario = async () => {
      setLoading(true);
      try {
        const datos = await getSolicitudById(id);
        console.log(datos);
        setFormData({
          nombreCliente: datos.nombre_cliente,
          apellidoCliente: datos.apellido_cliente,
          emailCliente: datos.email_cliente,
          detalles: datos.detalles,
          cedulaCliente: datos.cedula_cliente,
          monto_solicitado: datos.monto_solicitado,
          direccionHogar: "",
        });
      } catch (error) {
        console.error("Error al cargar los datos del formulario:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosFormulario();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pdfUrl, imageUrl;

      if (selectedPdf) {
        const pdfResponse = await uploadFile(selectedPdf);
        pdfUrl = pdfResponse.data.Location;
      }

      if (selectedImage) {
        const imageResponse = await uploadFile(selectedImage);
        imageUrl = imageResponse.data.Location;
      }

      const referenceData = {
        nombre_trabajo: formData.nombre_trabajo,
        telefono_trabajo: formData.telefono_trabajo,
        telefono_trabajo_c: "123456", // Valor predeterminado
        imagen_hogar: imageUrl,
        rol_pago: pdfUrl,
      };

      let referenceId; // Declara la variable fuera del alcance de los bloques try

      try {
        const referenceResponse = await createReference(referenceData);

        if (!referenceResponse || !referenceResponse.id_referencia) {
          throw new Error(
            "La respuesta de la API no contiene el ID de referencia"
          );
        }

        referenceId = parseInt(referenceResponse.id_referencia, 10);
        if (isNaN(referenceId)) {
          throw new Error("El ID de referencia no es un número válido");
        }
      } catch (error) {
        console.error("Error al crear la referencia:", error);
        setError("Error al crear la referencia: " + error.message);
        setLoading(false);
        return;
      }

      let personId;

      try {
        const personData = {
          nombre: formData.nombreCliente,
          apellido: formData.apellidoCliente,
          telefono: formData.numeroCelular,
          cedula: formData.cedulaCliente,
          telefono_2: formData.telefono_2,
          provincia: formData.provincia,
          ciudad: formData.ciudad,
          direccion: formData.direccion,
          direccion_2: formData.direccion_2,
          correo: formData.emailCliente,
          id_referencia_persona: referenceId,
        };

        const personResponse = await createPerson(personData);

        personId = parseInt(personResponse.id_persona, 10);
        if (isNaN(personId)) {
          throw new Error("El ID de la persona no es un número válido");
        }

        // Continúa con el resto de tu lógica para crear el usuario
        // ...
      } catch (error) {
        console.error("Error al crear la persona:", error);
        setError("Error al crear la persona: " + error.message);
        setLoading(false);
        return;
      }

      try {
        const userData = {
          usuario: formData.nombreCliente.charAt(0) + formData.apellidoCliente,
          contrasena: "nexfon",
          email: formData.emailCliente,
          id_persona: personId,
          id_rol: 5,
          id_configuracion_negocio: 1,
        };

        await createUser(userData);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }

      setSuccess("Solicitud enviada con éxito");
    } catch (error) {
      console.error("Error en el proceso de solicitud:", error);
      setError("Error al enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };
  

  const setSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000); // 5000 milisegundos = 5 segundos
  };

  const setError = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 5000); // 5000 milisegundos = 5 segundos
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handleReturnClick = () => {
    setShowForm(false);
  };
  // Función para manejar el clic en el botón Cancelar (puedes expandirla más adelante)
  const handleCancelClick = () => {
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="custom-container-cl">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {!showForm && (
        <Card className="mb-4 text-center">
          <Card.Body>
            <Card.Title style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
              ¡Felicidades, te aprobamos tu crédito!
            </Card.Title>
            <Card.Text style={{ fontSize: "1.25rem", margin: "20px 0" }}>
              A continuación, llena el formulario para un crédito. <br />
              <span style={{ fontWeight: "bold", color: "#28a745" }}>
                Monto del Crédito:
              </span>{" "}
              {formData.monto_solicitado}
            </Card.Text>
            <Card.Text>
              <strong>Detalles de la solicitud:</strong> {formData.detalles}
            </Card.Text>
            <Button
              variant="primary"
              style={{ borderColor: "white" }}
              onClick={handleNextClick}
            >
              <i className="fas fa-arrow-right"></i> Siguiente
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelClick}
              style={{ marginLeft: "10px" }}
            >
              <i className="fas fa-ban"></i> Cancelar Solicitud
            </Button>
          </Card.Body>
        </Card>
      )}

      {showForm && (
        <Card>
          <Card.Body>
            <Card.Title>¡Felicidades aprobo para un credito!</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
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
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido del Cliente</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese apellido del cliente"
                      name="apellidoCliente"
                      value={formData.apellidoCliente}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email del Cliente</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese email del cliente"
                      name="emailCliente"
                      value={formData.emailCliente}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefono Convencional</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese telefono del cliente"
                      name="telefono_2"
                      value={formData.telefono_2}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cedula"
                      name="cedulaCliente"
                      value={formData.cedulaCliente}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Numero Celular</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Numero Celular"
                      name="numeroCelular"
                      value={formData.numeroCelular}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Calle Principal</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Calle Secundaria</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      name="direccion_2"
                      value={formData.direccion_2}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Parroquia</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Detalles"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <h4>Referencias laborables</h4>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre trabajo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre del Trabajo"
                      name="nombre_trabajo" // Cambiado para reflejar el campo de la base de datos
                      value={formData.nombre_trabajo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefono trabajo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Telefono del Trabajo"
                      name="telefono_trabajo" // Cambiado para reflejar el campo de la base de datos
                      value={formData.telefono_trabajo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rol de Pagos en PDF</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                    />
                    {selectedPdf && (
                      <p>Archivo seleccionado: {selectedPdf.name}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Foto de la vivienda</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                    />
                    {selectedImage && (
                      <p>Archivo seleccionado: {selectedImage.name}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {previewImageUrl && (
                  <Card>
                    <Card.Header>Vista Previa de la Imagen</Card.Header>
                    <Card.Body>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={previewImageUrl}
                          alt="Vista previa"
                          style={{ maxWidth: "250px", height: "auto" }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Row>

              <Button
                variant="primary"
                style={{ borderColor: "white", marginTop: "1rem" }}
                type="submit"
                onClick={handleSubmit}
              >
                Completar Solicitud
              </Button>
              <Button variant="secondary"
                style={{ borderColor: "white", marginTop: "1rem" }}
                onClick={handleReturnClick}>
                Volver
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default FormularioCliente;
