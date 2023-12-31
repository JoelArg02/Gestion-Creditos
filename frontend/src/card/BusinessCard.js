import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getUsers, getBusiness, updateUser } from "../api/api";
import CreatableAsyncSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";

function BusinessModal({ show, handleClose }) {
  const [usuarios, setUsuarios] = useState([]);
  const [business, setBusiness] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedBusinessOption, setSelectedBusinessOption] = useState(null);
  const [selectedUserOption, setSelectedUserOption] = useState(null);

  const loadBusinessOptions = async (inputValue) => {
    try {
      const response = await getBusiness(inputValue);
      return response.map((business) => ({
        value: business.id_configuracion,
        label: business.negocio,
      }));
    } catch (error) {
      console.error("Error fetching business options:", error);
      return [];
    }
  };

  const handleSelectBusiness = (selectedOption) => {
    setSelectedBusinessOption(selectedOption);
  };

  const handleSelectUser = (selectedOption) => {
    setSelectedUserOption(selectedOption);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getUsers();
        setUsuarios(usersData);

        const businessData = await getBusiness();
        setBusiness(businessData);
      } catch (error) {
        setError("Error fetching data");
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUserOption && selectedBusinessOption) {
      try {
        await updateUser(selectedUserOption.value, {
          id_configuracion_negocio: selectedBusinessOption.value,
        });
        setSuccess("Usuario actualizado con éxito");
      } catch (error) {
        setError("Error al actualizar el usuario");
      }
    } else {
      setError("Seleccione un usuario y un negocio");
    }
  };

  const usuarioOptions = usuarios.map((usuario) => ({
    value: usuario.id_usuario,
    label: usuario.usuario,
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Negocios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Negocio</Form.Label>
            <CreatableAsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadBusinessOptions}
              onChange={handleSelectBusiness}
              value={selectedBusinessOption}
              placeholder="Seleccione o cree un negocio"
            />
          </Form.Group>

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

          <Button type="submit" variant="primary" className="mt-3">
            Asignar Negocio a Usuario
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BusinessModal;
