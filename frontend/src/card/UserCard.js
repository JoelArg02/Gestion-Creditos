import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Alert, Row, Col, Image } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { getUsers, updateUser } from "../api/api";
import { getPersonById } from "../api/person";
import { getReferenceById } from "../api/reference";
import "./UserCard.css";

function UserCard({ show, handleClose }) {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const [showReferenceForm, setShowReferenceForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [success, setSuccess] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const [personDetails, setPersonDetails] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });

  const [referenciaDetails, setReferenciaDetails] = useState({
    nombreTrabajo: "",
    telefonoTrabajo: "",
    telefonoTrabajoC: "",
    imagen_hogar: "",
  });

  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Contador" },
    { id: 3, name: "Cobrador" },
    { id: 4, name: "Vendedor" },
    { id: 5, name: "Cliente" },
  ];
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    roleId: "",
  });

  const fetchFormDetails = async () => {
    try {
      const referenceData = await getReferenceById(selectedUserOption.value); // Asegúrate de pasar el ID correcto
      if (referenceData) {
        setReferenciaDetails({
          nombreTrabajo: referenceData.nombre_trabajo,
          telefonoTrabajo: referenceData.telefono_trabajo,
          telefonoTrabajoC: referenceData.telefono_trabajo_c,
          imagen_hogar: referenceData.imagen_hogar,
        });
        console.log(referenceData.imagen_hogar)
      }
    } catch (error) {
      setError("Error al obtener detalles de la referencia");
    }
  };

  const fetchPersonDetails = async (userId) => {
    try {
      const personData = await getPersonById(userId);
      setPersonDetails({
        nombre: personData.nombre,
        apellido: personData.apellido,
        correo: personData.correo,
        direccion: personData.direccion,
        telefono: personData.telefono,
        telefono_2: personData.telefono_2,
        provincia: personData.provincia,
        ciudad: personData.ciudad,
        referencias: personData.id_referencia_persona,
      });
    } catch (error) {
      setError("Error al obtener detalles de la persona");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["nombre", "apellido", "correo"].includes(name)) {
      setPersonDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    if (referenciaDetails.imagen_hogar) {
      setImagenUrl(`${referenciaDetails.imagen_hogar}`);
    }
  }, [referenciaDetails]);

  useEffect(() => {
    if (selectedUserOption) {
      fetchPersonDetails(selectedUserOption.value);
    }
  }, [selectedUserOption]);

  useEffect(() => {
    if (selectedUserOption) {
      const user = usuarios.find(
        (u) => u.id_usuario === selectedUserOption.value
      );
      if (user) {
        setFormData({
          userId: user.id_usuario,
          username: user.usuario,
          email: user.email,
          roleId: user.id_rol,
        });
      }
    }
  }, [selectedUserOption, usuarios]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getUsers();
        setUsuarios(usersData);
      } catch (error) {
        setError("Error fetching data");
      }
    }
    fetchData();
  }, []);

  const cambiarImagen = () => {
    fileInputRef.current.click();
  };

  const manejarCambioImagen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagenUrl(url);
    }
  };

  const handleSelectUser = (selectedOption) => {
    setSelectedUserOption(selectedOption);
  };

  const usuarioOptions = usuarios.map((usuario) => ({
    value: usuario.id_usuario,
    label: usuario.usuario,
  }));

  const handleSearchUsers = () => {
    setShowUserSearch(true);
    setShowButtons(false);
  };

  const handleRegister = () => {
    setShowUserRegistration(true);
    setShowButtons(false);
  };

  const handleReference = () => {
    fetchFormDetails();
    setShowReferenceForm(!showReferenceForm); // Cambiar el estado para mostrar u ocultar el formulario
    renderReferenceForm(true);
    setShowButtons(false);
  };

  const renderUserRegistrationForm = () => (
    <Form.Group>
      <Form.Label>Usuario</Form.Label>
    </Form.Group>
  );

  const renderUserSearchForm = () => (
    <>
      <Form.Group>
        <Form.Label>Usuario</Form.Label>
        <CreatableSelect
          isClearable
          onChange={handleSelectUser}
          options={usuarioOptions}
          value={selectedUserOption}
          placeholder="Seleccione un usuario"
        />
      </Form.Group>
      {selectedUserOption && renderSelectedUserDetails()}
    </>
  );

  const renderReferenceForm = () => (
    <>
      <Form.Group className="mb-3" controlId="referencias">
        <Row>
          <Form.Group>
            <Form.Label>Nombre Trabajo</Form.Label>
            <Form.Control
              name="referencias"
              type="text"
              value={referenciaDetails.nombreTrabajo}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Telefono Trabajo</Form.Label>
              <Form.Control
                name="referencias"
                type="text"
                value={referenciaDetails.telefonoTrabajo}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Telefono Referencia 2</Form.Label>
              <Form.Control
                name="referencias"
                type="text"
                value={referenciaDetails.telefonoTrabajoC}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <div
              className="image-container"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={cambiarImagen}
              onMouseOver={(e) =>
                (e.currentTarget.children[1].style.display = "block")
              }
              onMouseOut={(e) =>
                (e.currentTarget.children[1].style.display = "none")
              }
            >
              <Image
                src={imagenUrl}
                style={{ width: "200px", height: "200px", marginTop: "30px" }}
                fluid
              />
              <div
                className="hover-text"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "10px",
                  display: "none",
                  textAlign: "center",
                }}
              >
                Clic para cambiar de foto
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={manejarCambioImagen}
            />
          </Col>
        </Row>
      </Form.Group>
    </>
  );

  const renderSelectedUserDetails = () => {
    if (!selectedUserOption) return null;
    const selectedUser = usuarios.find(
      (user) => user.id_usuario === selectedUserOption.value
    );

    if (!selectedUser) {
      return <p>No existe el usuario</p>;
    }

    return (
      <>
        <Form>
          <h4>Detalles del usuario:</h4>
          <Form.Group className="mb-3" controlId="names">
            <Row>
              <Col>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  value={personDetails.nombre}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  name="apellido"
                  type="text"
                  value={personDetails.apellido}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="correo"
                type="text"
                value={personDetails.correo}
                onChange={handleInputChange}
              />
            
            <h4>Direccion</h4>
            <Row>
              <Col>
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  name="calle"
                  type="text"
                  value={personDetails.direccion}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  name="telefono"
                  type="text"
                  value={personDetails.telefono}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Convencional</Form.Label>
                <Form.Control
                  name="telefono_2"
                  type="text"
                  value={personDetails.telefono_2}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  name="provincia"
                  type="text"
                  value={personDetails.provincia}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  name="ciudad"
                  type="text"
                  value={personDetails.ciudad}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            {/* {selectedUser.id_referencia_persona === "" && (
              <> */}
            <h4>Referencias</h4>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  size="lg"
                  block
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    marginTop: "10px",
                    borderColor: "white",
                  }}
                  onClick={handleReference}
                >
                  {showReferenceForm
                    ? "Cerrar Referencias"
                    : "Mostrar Referencias"}{" "}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>{showReferenceForm && renderReferenceForm()}</Col>
            </Row>
            {/* </>
            )} */}
          </Form.Group>
        </Form>
      </>
    );
  };

  const renderButtons = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "15px",
      }}
    >
      <Button
        variant="primary"
        onClick={handleSearchUsers}
        style={{ width: "45%", borderColor: "white" }}
      >
        Buscar Usuarios
      </Button>
      <Button
        variant="success"
        onClick={handleRegister}
        style={{ width: "45%" }}
      >
        Registrar
      </Button>
    </div>
  );

  const handleReturn = () => {
    setShowUserSearch(false);
    setShowUserRegistration(false);
    setSelectedUserOption(null);
    setShowButtons(true);
    setError("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {showButtons && renderButtons()}
        {showUserRegistration && renderUserRegistrationForm()}
        {showUserSearch && renderUserSearchForm()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReturn}>
          Volver
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserCard;
