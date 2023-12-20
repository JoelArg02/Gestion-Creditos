import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState } from "react";
import { login } from "../api/api";

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.usuario || !formData.contrasena) {
      setError("Debes ingresar un usuario y una contraseña");
      return;
    }

    try {
      const data = await login(formData.usuario, formData.contrasena);
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      setError(
        "Error al iniciar sesión: usuario inexistente o contraseña incorrecta"
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card my-5" style={{ borderColor: "#CCCCCC" }}>
            <div
              className="card-header text-center"
              style={{ backgroundColor: "#FFFFFF", color: "#333333" }}
            >
              Iniciar sesión
            </div>
            <div className="card-body" style={{ backgroundColor: "#FFFFFF" }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu usuario"
                    style={{
                      backgroundColor: "#F8F8F8",
                      borderColor: "#CCCCCC",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu contraseña"
                    style={{
                      backgroundColor: "#F8F8F8",
                      borderColor: "#CCCCCC",
                    }}
                  />
                </div>
                <div className="mb-3 text-center">
                  <a
                    href="#"
                    style={{ color: "#555555", textDecoration: "none" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#333333", color: "white" }}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
