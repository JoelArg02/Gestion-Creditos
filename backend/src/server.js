const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5200;

// Suponiendo que tienes estos archivos y rutas correctamente definidos
const usuarioRoutes = require('./routes/usuarioRoutes');
const creditoRoutes = require('./routes/creditoRoutes');
const referenciaRoutes = require('./routes/referenciaRoutes');
const businessRoutes = require('./routes/businessRoutes');
// Configuración de CORS para permitir solicitudes de cualquier origen
app.use(cors({
  origin: '*', // Permite todas las fuentes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
}));

// Parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de créditos!');
});

app.post('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de créditos!');
});

app.put('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de gestión de créditos!');
});

// Ruta de Negocios

app.use('/api/business', businessRoutes);

// Rutas de referencia
app.use('/api/referencia', referenciaRoutes);

// Rutas de usuario
app.use('/api/usuarios', usuarioRoutes);

// Rutas de créditos
app.use('/api/credit', creditoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo salió mal' });
});

app.use((req, res, next) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
