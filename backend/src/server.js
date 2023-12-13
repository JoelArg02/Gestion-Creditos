const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5200;

const usuarioRoutes = require('./routes/usuarioRoutes');

// Configuración para permitir cualquier origen (CORS)
app.use(cors());

app.use(bodyParser.json());

// Ruta predeterminada para la URL raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de créditos!');
});

// Rutas de usuario
app.use('/api/usuarios', usuarioRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
