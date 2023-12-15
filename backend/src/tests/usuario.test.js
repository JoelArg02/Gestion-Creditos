const Usuario = require('../models/usuario'); // Reemplaza con la ruta correcta a tu modelo
const db = require('../config/db');

// Supongamos que tienes configurada una base de datos de prueba para las pruebas unitarias

beforeAll(() => {
  // Configura la base de datos de prueba o realiza otras configuraciones necesarias
});

afterAll(() => {
  // Cierra la conexión a la base de datos de prueba o realiza otras tareas de limpieza
});

test('Usuario.getAllUsuarios devuelve una lista de usuarios', (done) => {
  Usuario.getAllUsuarios((err, usuarios) => {
    expect(err).toBeNull();
    expect(Array.isArray(usuarios)).toBe(true);
    done();
  });
});


test('Usuario.registerUsuario registra un nuevo usuario', (done) => {
  const nuevoUsuario = {
    usuario: 'admin',
    contrasena: 'admin',
    id_configuracion_usuario: 1, // Reemplaza con un ID válido para tus pruebas
  };

  Usuario.registerUsuario(nuevoUsuario.usuario, nuevoUsuario.contrasena, nuevoUsuario.id_configuracion_usuario, (err) => {
    expect(err).toBeNull();
    done();
  });
});

