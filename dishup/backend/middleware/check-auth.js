const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "string_de_seguridad");
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Error en la autentificacion" });
  }
};
