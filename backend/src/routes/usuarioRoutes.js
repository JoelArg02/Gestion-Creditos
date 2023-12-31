const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Rutas de usuario
router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);
router.get("/", usuarioController.getUsuarios);
router.get("/:usuario", usuarioController.findUserByUser);
router.post("/update-password/:id_usuario", usuarioController.updatePassword);

router.get("/id/:id_usuario", usuarioController.getUserById);


// Verificar token recuperar contraseña
router.post("/send-recovery-code", usuarioController.sendRecoveryCode);
router.post("/verify-recovery-code", usuarioController.verifyRecoveryCode);
 // Aqui ya cambia de pass
router.post("/change-password", usuarioController.changePassword);



module.exports = router;
