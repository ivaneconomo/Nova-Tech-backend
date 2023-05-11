const User = require('../models/users.model');
const {
  saveUser,
  findUsers,
  findUser,
  findUserData,
  updateUser,
  deleteUserById,
} = require('../services/users.services');
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

    await saveUser(userData);
    res.status(200).json('Se ha registrado con éxito.');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await findUserData(id);

    if (!user) {
      return res.status(404).json('Usuario inexistente.');
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json('Contraseña incorrecta.');
    }

    res.status(200).json({ message: 'Contraseña validada con éxito.' });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      userData.password = bcrypt.hashSync(userData.password, salt);
    }

    await updateUser(id, userData);
    res.status(200).json('Usuario modificado con éxito.');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await findUsers();
    if (users.length === 0) {
      res.status(200).json('No existen usuarios registrados.');
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (!user) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const disabled = { disabled: true };
    const disabledUser = await updateUser(id, disabled);
    if (!disabledUser) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(`El usuario con el id: "${id}" ha sido deshabilitado`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addtoCart = async(req, res) =>{
  try {
    const { id } = req.params;
    const { idProduct } = req.body;
    const user = await findUser(id);
    const index = user.cart.findIndex((item)=> item.id === idProduct);
    if(index >= 0){
      user.cart[index].quantity++;
    }else{
      user.cart.push({id: idProduct, quantity: 1});
    }

    const newCart = { cart: user.cart }

    const resp = await updateUser(id, newCart);
    if(!resp) return res.status(404).json('no se pudo agregar producto');
    res.status(200).json(resp.cart)
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCart = async(req,res)=>{
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if(!user) return res.status(404).json('usuario no encontrado');
    res.status(200).json(user.cart)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  disableUser,
  checkPassword,
  addtoCart,
  getCart
};
