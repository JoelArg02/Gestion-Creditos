import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {

  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: ''    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.usuario || !formData.contrasena) {
      console.error('Debes ingresar un usuario y una contraseña');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5200/api/usuarios/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      console.log('Token recibido:', token);

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 p-4 rounded">
          <div className="card">
            <div className="card-header">
              Iniciar sesión
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="usuario"
                    className="form-control"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
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
                  />
                </div>
                <button type="submit" className="btn btn-primary">
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
