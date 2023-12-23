import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getUsers, getBusiness, updateBusiness } from "../api/api";
import CreatableAsyncSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";

function BusinessModal({ show, handleClose }) {
  const [usuarios, setUsuarios] = useState([]);
  const [business, setBusiness] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedBusinessOption, setSelectedBusinessOption] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState({
    id_configuracion: "",
    negocio: "",
    id_usuario: "",
    lema: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    correo_admin: "",
    correo_publico: "",
  });

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

  const handleInputChange = (inputValue) => {};

  const handleCreate = (inputValue) => {
    console.log("Crear nuevo usuario:", inputValue);
  };
  const usuarioOptions = usuarios.map((usuario) => ({
    value: usuario.id_usuario,
    label: usuario.usuario,
  }));

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
  const handleSelectBusiness = (id) => {
    const selected = business.find(
      (b) => b?.id_configuracion.toString() === id.toString()
    );
    setSelectedBusiness(selected || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBusiness(selectedBusiness.id_configuracion, selectedBusiness);
      setSuccess("Business updated successfully");
    } catch (error) {
      setError("Failed to update business");
    }
  };

  const handleCreateBusiness = (inputValue) => {
    const confirmCreate = window.confirm(
      `¿Desea crear el negocio "${inputValue}"?`
    );
    if (confirmCreate) {
      console.log("Creando negocio:", inputValue);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Administrar Negocios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <CreatableAsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadBusinessOptions}
            onChange={(selectedOption) => {
              setSelectedBusinessOption(selectedOption);
              handleSelectBusiness(selectedOption.value);
            }}
            onCreateOption={handleCreateBusiness}
            value={selectedBusinessOption}
            placeholder="Busque el negocio"
            formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
          />

          {selectedBusinessOption && (
            <>
              <Form.Group>
                <Form.Label>Nombre del negocio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={selectedBusiness.negocio || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      negocio: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Lema</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lema"
                  value={selectedBusiness.lema || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      lema: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Facebook"
                  value={selectedBusiness.facebook || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      facebook: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Instagram"
                  value={selectedBusiness.instagram || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      instagram: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Whatsapp"
                  value={selectedBusiness.whatsapp || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      whatsapp: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Correo administrador</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Correo"
                  value={selectedBusiness.correo_admin || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      correo_admin: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Correo Publico</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Correo"
                  value={selectedBusiness.correo_publico || ""}
                  onChange={(e) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      correo_publico: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Usuario Responsable</Form.Label>
                <CreatableSelect
                  isClearable
                  onChange={(selectedOption) =>
                    setSelectedBusiness({
                      ...selectedBusiness,
                      id_usuario: selectedOption ? selectedOption.value : "",
                    })
                  }
                  onInputChange={handleInputChange}
                  onCreateOption={handleCreate}
                  options={usuarioOptions}
                  value={usuarioOptions.find(
                    (option) => option.value === selectedBusiness.id_usuario
                  )}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant="primary"
          style={{ borderColor: "white" }}
          onClick={handleSubmit}
        >
          Actualizar
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BusinessModal;
