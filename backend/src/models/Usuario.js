const poolc = require("../config/db"); // Asegúrate de que la ruta sea correcta
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const Usuario = {};

Usuario.getAllUsuarios = (callback) => {
  poolc.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

Usuario.getUserById = (id, callback) => {
  console.log(id);
  poolc.query("SELECT * FROM usuarios where id_usuario = $1", [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows[0]);
    }
  });
};

Usuario.createUser = (
  usuario,
  contrasena,
  id_configuracion_usuario,
  callback
) => {
  if (typeof callback !== "function") {
    throw new Error("Callback debe ser una función");
  }

  bcrypt.hash(contrasena, 10, function (err, hash) {
    if (err) {
      return callback(err);
    }

    poolc.query(
      "INSERT INTO usuarios (usuario, contrasena, id_configuracion_usuario) VALUES ($1, $2, $3)",
      [usuario, hash, id_configuracion_usuario],
      function (error, result) {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      }
    );
  });
};

Usuario.findUserByUser = (usuario, callback) => {
  poolc.query(
    "SELECT * FROM usuarios WHERE usuario = $1",
    [usuario],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        if (results.rows.length === 0) {
          callback(new Error("Usuario no existe"), null);
        } else {
          callback(null, results.rows[0]);
        }
      }
    }
  );
};

Usuario.updatePassword = (id_usuario, contrasena, callback) => {
  bcrypt.hash(contrasena, 10, function (err, hash) {
    if (err) {
      return callback(err);
    }
    console.log(id_usuario, contrasena, hash);
    poolc.query(
      "UPDATE usuarios SET contrasena = $1 WHERE id_usuario = $2",
      [hash, id_usuario],
      function (error, result) {
        if (error) {
          return callback(error);
        }

        callback(null, result);
      }
    );
  });
};

Usuario.changePassword = (email, newPassword, callback) => {
  bcrypt.hash(newPassword, 10, function (err, hash) {
    if (err) {
      return callback(err);
    }

    poolc.query(
      "UPDATE usuarios SET contrasena = $1 WHERE email = $2",
      [hash, email],
      function (error, result) {
        if (error) {
          return callback(error);
        }
        callback(null, result);
      }
    );
  });
};

Usuario.generateRecoveryCode = (email, callback) => {
  const recoveryCode = crypto.randomBytes(20).toString("hex"); // Genera un código seguro
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10); // Establece la expiración a 10 minutos

  poolc.query(
    "UPDATE usuarios SET codigo_recuperacion = $1, codigo_recuperacion_expira = $2 WHERE email = $3",
    [recoveryCode, expirationTime, email],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, recoveryCode);
    }
  );
};

Usuario.verifyRecoveryCode = (email, code) => {
  return new Promise((resolve, reject) => {
    poolc.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email],
      (err, results) => {
        if (err) {
          reject(err);
        } else if (results.rows.length === 0) {
          resolve(false);
        } else {
          const user = results.rows[0];
          const isCodeValid =
            user.codigo_recuperacion === code &&
            new Date() < new Date(user.codigo_recuperacion_expira);
          resolve(isCodeValid);
        }
      }
    );
  });
};

Usuario.checkUserExists = (email, callback) => {
  poolc.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.rows.length > 0);
    }
  );
};

module.exports = Usuario;
