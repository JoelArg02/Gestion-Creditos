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
      const response = await axios.post('http://192.168.68.107:5200/api/usuarios/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Token recibido:', token);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card my-5">
            <div className="card-header bg-primary text-white text-center">
              Iniciar sesión
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
