drop database creditos;
create database creditos;
use creditos;
SET GLOBAL time_zone = 'America/Guayaquil';
CREATE TABLE configuracion_negocio (
    id_configuracion INT AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    estado boolean NOT NULL,
    id_configuracion_usuario INT NOT NULL,
    FOREIGN KEY (id_configuracion_usuario) REFERENCES configuracion_negocio(id_configuracion)
);

create table referencia(
    id_referencias int auto_increment primary key,
    nombre_trabajo varchar(255) not null,
    telefono_trabajo varchar(255) not null,
    telefono_trabajo_c varchar(255) not null
);

create table persona(
    id_persona int auto_increment primary key,
    nombre varchar(255) not null,
    apellido varchar(255) not null,
    telefono varchar(255) not null,
    telefno_2 varchar(255) not null,
    pais varchar(255) not null,
    ciudad varchar(255) not null,
    direccion varchar(255) not null,
    direccion_2 varchar(255) not null,
    referencia varchar(255) not null,
    correo varchar(255) not null,
    id_referencias_persona int not null,
    id_usuarios_persona int not null,
    foreign key (id_referencias_persona) references referencia(id_referencias),
    foreign key (id_usuarios_persona) references usuarios(id_usuario)
);



CREATE TABLE creditos (
    id_credito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_credito_crea INT NOT NULL,
    id_usuario_credito_revisa INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    interes DECIMAL(5, 2),
    fecha_inicio DATE NOT NULL,
    FechaVencimiento DATE NOT NULL,
    Estado boolean NOT NULL,
    FOREIGN KEY (id_usuario_credito_crea) REFERENCES usuarios(id_usuario),
    foreign key (id_usuario_credito_revisa) references usuarios(id_usuario)
);

-- Creación de la tabla de Configuración de la Página

