import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { getUsers, updateUser } from "../api/api";
import "./UserCard.css";

function UserCard({ show, handleClose }) {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const renderSelectedUserDetails = () => {
    if (!selectedUserOption) return null;
    const selectedUser = usuarios.find(
      (user) => user.id_usuario === selectedUserOption.value
    );

    if (!selectedUser) {
      return <p>No existe el usuario</p>;
    }
    console.log(selectedUser);

    return (
      <>
        <Form>
          <h4>Detalles del usuario:</h4>
          <Form.Group className="mb-3" controlId="userId">
            <Form.Label>ID de Usuario:</Form.Label>
            <Form.Control
              name="userId"
              type="text"
              value={formData.userId}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="names">
            <Form.label>Nombre: </Form.label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Form.label>Apellido: </Form.label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol:</Form.Label>
            <Form.Select
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="custom-select"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
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
