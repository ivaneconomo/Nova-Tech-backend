const { createNewUser } = require('../services/users.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;

    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);

    await createNewUser(userData);
    res.status(200).json('Se ha registrado con éxito.');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createUser,
};
