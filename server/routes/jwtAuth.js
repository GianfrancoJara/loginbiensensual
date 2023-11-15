const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

let Usuario = require('../models/usuario.model');
//registering

router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existe = await Usuario.findOne({ correo: email }).catch(err => {
            console.error("Error al buscar usuario existente:", err);
            res.status(400).json("Error al buscar usuario existente");
        });

        if (existe !== null) {
            console.log("Usuario ya existente");
            return res.status(401).json("Usuario ya existente");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let nuevoUsuario = new Usuario({
            nombre: name,
            correo: email,
            contraseña: bcryptPassword,
            autoridad: "cliente"
        });

        nuevoUsuario.save()
            .then(() => {
                const token = jwtGenerator(nuevoUsuario.correo);
                const response = {
                    newUser: nuevoUsuario,
                    token: token
                };
                console.log("Usuario registrado con éxito:", response);
                res.json(response);
            })
            .catch(err => {
                console.error("Error al guardar el nuevo usuario:", err);
                res.status(400).json("Error al guardar el nuevo usuario");
            });

    } catch (err) {
        console.error("Error en la ruta de registro:", err.message);
        res.status(500).send("Error en el servidor");
    }
});

//Login route

router.post("/login", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        const buscaUsuario = await Usuario.findOne({ correo: email }).catch(err => {
            console.error("Error al buscar usuario en el inicio de sesión:", err);
            res.status(400).json("Error al buscar usuario en el inicio de sesión");
        });

        if (buscaUsuario === null) {
            console.log("Usuario no encontrado");
            return res.status(401).json("Contraseña o Email incorrecto");
        }

        const validPassword = await bcrypt.compare(password, buscaUsuario.contraseña);

        if (!validPassword) {
            console.log("Contraseña incorrecta");
            return res.status(401).json("Contraseña o Email incorrecto");
        }

        const token = jwtGenerator(buscaUsuario.correo, buscaUsuario.nombre, buscaUsuario.autoridad, buscaUsuario._id);
        console.log("Inicio de sesión exitoso. Token generado:", token);
        return res.json({ token });

    } catch (err) {
        console.error("Error en la ruta de inicio de sesión:", err.message);
        res.status(500).send("Error en el servidor");
    }
});

router.get("/verify", authorization, async (req, res) => {
    try {
        const buscaUsuario = await Usuario.findOne({ correo: req.correo });

        if (!buscaUsuario) {
            console.log("Usuario no encontrado durante la verificación");
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuarioActual = {
            nombre: buscaUsuario.nombre,
            correo: req.correo,
            autoridad: buscaUsuario.autoridad,
            id_usuario: buscaUsuario._id
        };
        console.log("Verificación exitosa. Usuario actual:", usuarioActual);
        res.json(usuarioActual);

    } catch (err) {
        console.error("Error en la ruta de verificación:", err.message);
        res.status(500).send("Error en el servidor");
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meencantaelcounter@gmail.com',
        pass: 'tknn btgp xjyn nmqj',
    },
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ correo: email });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  
      // Enviar el token por correo electrónico al usuario
      const mailOptions = {
        from: 'meencantaelcounter@gmail.com',
        to: usuario.correo,
        subject: 'Recuperación de Contraseña',
        text: `Utiliza este token para restablecer tu contraseña: ${token}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        }
  
        console.log(`Correo electrónico enviado: ${info.response}`);
        return res.json({ message: 'Token enviado exitosamente' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  });

  router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const usuario = await Usuario.findById(decoded.userId);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Actualizar la contraseña en la base de datos
      usuario.contraseña = await bcrypt.hash(newPassword, 10);
      await usuario.save();
  
      return res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  });


module.exports = router;

