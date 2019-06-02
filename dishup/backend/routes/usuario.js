const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const usuario = new Usuario({
      email: req.body.email,
      password: hash
    });
    usuario
      .save()
      .then(result => {
        res.status(201).json({
          mensaje: "Usuario creado",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let usuarioObtenido;
  Usuario.findOne({ email: req.body.email })
    .then(usuario => {
      if (!usuario) {
        return res.status(401).json({
          mensaje: "autentificacion fallida"
        });
      }
      usuarioObtenido = usuario;
      return bcrypt.compare(req.body.password, usuario.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          mensaje: "autentificacion fallida"
        });
      }
      const token = jwt.sign(
        { email: usuarioObtenido.email, userId: usuarioObtenido._id },
        "string_de_seguridad",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        mensaje: "autentificacion fallida"
      });
    });
});

module.exports = router;
