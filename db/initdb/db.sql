
-- Eliminar la base de datos si existe y crear una nueva
-- En PostgreSQL, no es común manejar la creación de bases de datos en scripts SQL,
-- se asume que ya está creada y se utiliza directamente.
-- Conectar a la base de datos 'creditos' (debe ser creada previamente en PostgreSQL)
-- \c creditos
-- Desactivar las verificaciones de clave foránea (no es común en PostgreSQL)
-- SET foreign_key_checks = 0;
-- Configurar zona horaria (se puede configurar a nivel de sesión o base de datos)
SET
    TIMEZONE = 'America/Guayaquil';

-- Creación de tablas
CREATE TABLE configuracion_negocio (
    id_configuracion SERIAL PRIMARY KEY,
    negocio VARCHAR(255) NOT NULL,
    url_logo VARCHAR(255),
    url_favicon VARCHAR(255),
    lema VARCHAR(100),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(255),
    correo_admin VARCHAR(255),
    correo_publico VARCHAR(255)
);

CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE solicitudes (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(255) NOT NULL,
    apellido_cliente VARCHAR(255) NOT NULL,
    cedula_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) NOT NULL,
    whatsapp_cliente VARCHAR(255) NOT NULL,
    monto_solicitado DECIMAL NOT NULL,
    detalles TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enlace_expira TIMESTAMP,
    id_formulario_cliente UUID NOT NULL
);

CREATE TABLE referencias (
    id_referencia SERIAL PRIMARY KEY,
    nombre_trabajo VARCHAR(255) NOT NULL,
    telefono_trabajo VARCHAR(255) NOT NULL,
    telefono_trabajo_c VARCHAR(255) NOT NULL,
    imagen_hogar VARCHAR(255) NOT NULL,
    rol_pago VARCHAR(255) NOT NULL
    doc_serv VARCHAR(255) NOT NULL
);

CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    cedula INTEGER NOT NULL,
    telefono_2 VARCHAR(255),
    provincia VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    direccion_2 VARCHAR(255),
    correo VARCHAR(255) NOT NULL,
    id_referencia_persona INT DEFAULT 1,
    FOREIGN KEY (id_referencia_persona) REFERENCES referencias(id_referencia)
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    codigo_recuperacion VARCHAR(255),
    codigo_recuperacion_expira TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    id_persona INT,
    id_rol INT,
    id_configuracion_negocio INT,
    id_solicitud_usuario INT,
    FOREIGN KEY (id_configuracion_negocio) REFERENCES configuracion_negocio(id_configuracion),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_persona) REFERENCES personas(id_persona),
    FOREIGN KEY (id_solicitud_usuario) REFERENCES solicitudes(id)
);

CREATE TABLE detalle_credito (
    id_detalle_credito SERIAL PRIMARY KEY,
    detalle_credito VARCHAR(255) NOT NULL
);

insert into
    detalle_credito (detalle_credito)
values
    ('Credito de 1 año');

CREATE TABLE creditos (
    id_credito SERIAL PRIMARY KEY,
    id_usuario_credito_crea INT NOT NULL,
    id_usuario_credito_usuario INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    plazo INT NOT NULL,
    interes DECIMAL(5, 2) NOT NULL,
    entrada DECIMAL(10, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    estado BOOLEAN NOT NULL,
    detalle_credito int NOT NULL,
    FOREIGN KEY (detalle_credito) REFERENCES detalle_credito(id_detalle_credito),
    FOREIGN KEY (id_usuario_credito_crea) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_usuario_credito_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_credito INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    FOREIGN KEY (id_credito) REFERENCES creditos(id_credito)
);

-- Inserciones
INSERT INTO
    configuracion_negocio (
        negocio,
        url_logo,
        url_favicon,
        lema,
        facebook,
        instagram,
        whatsapp,
        correo_admin,
        correo_publico
    )
VALUES
    (
        'Nexfon',
        'https://nexfon-logo.com',
        'https://nexfon-favicon.com',
        'Conectando tu mundo',
        'https://facebook.com/nexfon',
        'https://instagram.com/nexfon',
        '+1234567890',
        'admin@nexfon.com',
        'contact@nexfon.com'
    );

insert into
    referencias (
        nombre_trabajo,
        telefono_trabajo,
        telefono_trabajo_c,
        imagen_hogar
    )
values
    (
        'Juan Perez',
        '0998765432',
        '0998765432',
        '/1.jpg'
    );

INSERT INTO
    personas (
        nombre,
        apellido,
        telefono,
        cedula,
        provincia,
        ciudad,
        direccion,
        correo,
        id_referencia_persona
    )
VALUES
    (
        'Juan',
        'Pérez',
        '0998765432',
        '1710202449',
        'Ecuador',
        'Quito',
        'Calle Falsa 123',
        'juan.perez@example.com',
        1
    );

INSERT INTO
    roles (nombre_rol)
VALUES
    ('Administrador'),
    ('Encargado Creditos'),
    ('Vendedor'),
    ('Cobros'),
    ('Cliente');

INSERT INTO
    usuarios (
        usuario,
        contrasena,
        email,
        id_configuracion_negocio,
        id_persona,
        id_rol
    )
VALUES
    (
        'admin',
        '$2b$10$tp7XPY3ypO90tyN5XX2.HeCKTvkY/U43cMqndYwTuwboV8AVptzHi',
        'joel.darguello@gmail.com',
        1,
        1,
        1
    );

insert into
    creditos (
        id_usuario_credito_crea,
        id_usuario_credito_usuario,
        monto,
        plazo,
        interes,
        entrada,
        fecha_inicio,
        fecha_vencimiento,
        estado,
        detalle_credito
    )
values
    (
        1,
        1,
        800,
        7,
        25.00,
        20.00,
        '2023-01-01',
        '2023-12-31',
        true,
        1
    );

INSERT INTO
    pagos (id_credito, monto, fecha_pago)
VALUES
    (1, 100.00, CURRENT_DATE),
    (1, 150.00, CURRENT_DATE),
    (1, 200.00, CURRENT_DATE),
    (1, 50.00, CURRENT_DATE),
    (1, 75.00, CURRENT_DATE);