import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { EyeSlash, Eye } from "react-bootstrap-icons"; // Asegúrate de haber instalado react-bootstrap-icons

function ProfileModal({
  show,
  handleClose,
  userName,
  personName,
  personLastName,
  personPhone,
  personPhone2,
  personPais,
  personCiudad,
  personDireccion,
  personEmail,
}) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEditPasswordClick = () => {
    setShowChangePassword(!showChangePassword);
    setPasswordError(""); // Resetear el mensaje de error
  };

  const handleSaveNewPassword = () => {
    if (newPassword === confirmPassword) {
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } else {
      setPasswordError("Las contraseñas no coinciden");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Perfil del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Nombre: {personName}</p>
        <p>Apellido: {personLastName}</p>
        <p>Email: {personEmail}</p>

        <Button variant="primary" onClick={handleEditPasswordClick}>
          Editar Contraseña
        </Button>

        {showChangePassword && (
          <>
            <Form className="mt-3">
              <Form.Group controlId="formNewPassword">
                <Form.Label>Nueva Contraseña</Form.Label>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
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
              <Button variant="success" onClick={handleSaveNewPassword}>
                Guardar Nueva Contraseña
              </Button>
            </Form>
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
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
