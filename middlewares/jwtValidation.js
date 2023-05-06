const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    if (!token) return res.status(400).json("Token inexistente");
    jwt.verify(token, process.env.SECRET, (error) => {
      if (error) return res.status(401).json("Token invalido");
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const jwtValidatorUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers["access-token"];
    if (!token) return res.status(400).json("Token inexistente");
    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
      if (error) return res.status(401).json("Token invalido");
      if (decodedToken.id !== id)
        return res.status(403).json("No eres el usuario legitimo");
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const jwtValidatorAdmin = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    if (!token) return res.status(400).json("Token inexistente");
    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
      if (error) return res.status(401).json("Token invalido");
      if (decodedToken.roleAdmin === false)
        return res.status(403).json("No tiene permisos de admnistrador");
      next();
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  jwtValidator,
  jwtValidatorAdmin,
  jwtValidatorUser,
};
