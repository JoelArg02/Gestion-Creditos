import 'bootstrap/dist/css/bootstrap.min.css';
// Login.js
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    console.log('Datos de inicio de sesión:', formData);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`container-fluid ${
        darkMode ? 'bg-dark text-white' : ''
      } vh-100`}
    >
      <button
        className={`btn btn-sm btn-${darkMode ? 'light' : 'dark'} position-absolute top-0 end-0 m-2`}
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
      <div
        className={`row justify-content-center align-items-center h-100 ${
          darkMode ? 'text-white' : ''
        }`}
      >
        <div className={`col-md-6 ${darkMode ? 'bg-dark' : ''} p-4 rounded`}>
          <div
            className={`card ${darkMode ? 'bg-dark border border-white' : ''}`}
          >
            <div className={`card-header ${darkMode ? 'bg-secondary' : ''}`}>
              Iniciar sesión
            </div>
            <div className={`card-body ${darkMode ? 'bg-dark' : ''}`}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className={`form-label ${
                      darkMode ? 'text-white' : ''
                    }`}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      darkMode ? 'text-white bg-dark' : ''
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className={`form-label ${
                      darkMode ? 'text-white' : ''
                    }`}
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      darkMode ? 'text-white bg-dark' : ''
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    darkMode ? 'btn-secondary border border-white' : ''
                  }`}
                >
                  Iniciar sesión
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
