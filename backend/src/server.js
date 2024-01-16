require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5200;


// Suponiendo que tienes estos archivos y rutas correctamente definidos
const usuarioRoutes = require('./routes/usuarioRoutes');
const creditoRoutes = require('./routes/creditoRoutes');
const referenciaRoutes = require('./routes/referenciaRoutes');
const businessRoutes = require('./routes/businessRoutes');
const rolRoutes = require('./routes/rolRoutes');
const personRoutes = require('./routes/personRoutes');
const pagosRoutes = require('./routes/pagosRoutes');
const mailerRoutes = require('./routes/mailerRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const SpacesRoutes = require('./routes/SpacesRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

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


app.set('trust proxy', true); // trust first proxy

// Ruta de whatsapp

app.use('/api/whatsapp', webhookRoutes);


// Ruta de Negocios

app.use('/api/mail', mailerRoutes);

app.use('/api/business', businessRoutes);

// Rutas de referencia
app.use('/api/referencia', referenciaRoutes);

// Rutas de usuario
app.use('/api/usuarios', usuarioRoutes);

// Rutas de créditos
app.use('/api/credit', creditoRoutes);

// Rutas de roles 
app.use('/api/rols', rolRoutes);

// Rutas de personas
app.use('/api/person', personRoutes);

// Rutas para pagos
app.use('/api/pagos', pagosRoutes);

// Rutas de formularios/solicituds
app.use('/api/solicitud', solicitudRoutes);

// Rutas de Spaces
app.use('/api/spaces', SpacesRoutes);

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

const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}


