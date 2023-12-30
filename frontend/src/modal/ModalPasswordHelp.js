import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {
  sendRecoveryCode,
  verifyRecoveryCode,
  changePassword,
} from "../api/api";

function ModalPasswordHelp({ onClose }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("prueba");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("email");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      await sendRecoveryCode(email);

      setStep("code");
    } catch (error) {
      console.error("Error al enviar el código de recuperación:", error);
      setError(
        "No se pudo enviar el código de recuperación. Verifica tu correo electrónico."
      );
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();

    try {
      
      const response = await verifyRecoveryCode(email, code);

      if (response.message === "Codigo verificado correctamente") {
        setStep("password"); // Cambiar al paso "password" después de verificar el código
      } else {
        setError(
          "Código inválido o expirado. Verifica el código e inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al verificar el código de recuperación:", error);
      setError(
        "No se pudo verificar el código de recuperación. Verifica el código e inténtalo de nuevo."
      );
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        await changePassword(email, newPassword);
        setMessage(
          "Se cambió la contraseña correctamente. Puedes iniciar sesión con tu nueva contraseña."
        );

        setNewPassword("");
        setConfirmPassword("");
        setCode("");
        setEmail("");
        setError("");
        setStep("email");
      } else {
        setError("Las contraseñas no coinciden");
      }
    } catch (error) {
      setError(
        "No se pudo cambiar la contraseña. Verifica los datos y vuelve a intentarlo."
      );
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === "email" && (
          <Form onSubmit={handleSubmitEmail}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ borderColor: "white", marginTop: 10 }}
              type="submit"
            >
              Enviar
            </Button>
          </Form>
        )}

        {step === "code" && (
          <Form onSubmit={handleSubmitCode}>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Código de recuperación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el código de recuperación"
                value={code}
                onChange={handleCodeChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ borderColor: "white", marginTop: 10 }}
              type="submit"
            >
              Validar
            </Button>
          </Form>
        )}

        {step === "password" && (
          <Form onSubmit={handleSubmitPassword}>
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ borderColor: "white", marginTop: 10 }}
              type="submit"
            >
              Cambiar Contraseña
            </Button>
          </Form>
        )}

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
    </Modal>
  );
}

export default ModalPasswordHelp;
