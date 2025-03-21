const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

/**
 * @route POST /register
 * @description Registra un nuevo usuario en la base de datos.
 * @access Público
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Contiene los datos del usuario (name, email, password).
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {JSON} Mensaje de éxito o error.
 */
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Usuario registrado" });
    } catch (err) {
        res.status(500).json({ error: "Error en el registro" });
    }
});

/**
 * @route POST /login
 * @description Inicia sesión para un usuario existente.
 * @access Público
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Contiene las credenciales del usuario (email, password).
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {JSON} Mensaje de éxito o error con las credenciales de sesión.
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Credenciales inválidas" });
    }

    req.session.user = { id: user._id, name: user.name, email: user.email };
    res.json({ message: "Inicio de sesión exitoso" });
});
module.exports = router;
