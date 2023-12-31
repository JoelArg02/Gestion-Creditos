import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { updatePassword } from "../api/api";

function ProfileModal({
  show,
  handleClose,
  userId,
  personName,
  personLastName,
  personEmail,
}) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [id_usuario, setId_usuario] = useState("");

  useEffect(() => {
    setId_usuario(userId);
  }, [userId]);

  const handleEditPasswordClick = () => {
    setShowChangePassword(!showChangePassword);
    setPasswordError("");
  };

  const handleSaveNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const response = await updatePassword(id_usuario, newPassword);
        if (
          response &&
          response.message === "Contraseña actualizada con éxito"
        ) {
          setShowChangePassword(false);
          setNewPassword("");
          setConfirmPassword("");
          setPasswordError("");
        } else {
          console.log("Algo salio mal");
        }
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
      }
    } else {
      setPasswordError("Las contraseñas no coinciden");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={show} onHide={handleClose} size="">
      <Modal.Header closeButton>
        <Modal.Title>Perfil del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Nombre: {personName}</p>
        <p>Apellido: {personLastName}</p>
        <p>Email: {personEmail}</p>

        <Button
          variant="primary"
          className="my-3"
          style={{ borderColor: "white" }}
          onClick={handleEditPasswordClick}
        >
          Editar Contraseña
        </Button>

        {showChangePassword && (
          <>
            <Form>
              <Form.Group controlId="formNewPassword">
                <Form.Label>Nueva Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formConfirmNewPassword">
                <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="success"
                className="mt-3"
                onClick={handleSaveNewPassword}
              >
                Guardar Nueva Contraseña
              </Button>
            </Form>
            {passwordError && (
              <Alert variant="danger" className="mt-3">
                {passwordError}
              </Alert>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
