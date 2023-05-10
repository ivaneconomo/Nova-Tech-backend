const { Router } = require('express');
const { body, check } = require('express-validator');
const {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  disableUser,
  deleteUser,
  addtoCart,
  getCart
} = require('../controllers/users.controller');
const { emailValidation } = require('../middlewares/validation.userExist');
const {
  jwtValidatorAdmin,
  jwtValidatorUser,
} = require('../middlewares/jwtValidation');

const route = Router();

route.post(
  '/create-user',
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El nombre solo puede contener letras y los siguientes caracteres especiales: -'"
    ),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El apellido solo puede contener letras y los siguientes caracteres especiales: - '"
    ),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio.')
    .isLength({ min: 5, max: 100 })
    .withMessage('El email debe contener entre 5 y 100 caracteres.')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    .withMessage('El correo electrónico debe tener un formato válido.')
    .custom(emailValidation),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 50 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
    .withMessage('La contraseña debe tener letras y números.'),
  check('lang')
    .isIn(['es', 'en'])
    .withMessage('El idioma debe ser español o inglés.'),
  body('cart')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  body('disabled')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  body('roleAdmin')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  createUser
);

route.get('/get-users', jwtValidatorAdmin, getAllUsers);

route.get('/get-user-by-id/:id', jwtValidatorUser, getUserById);

route.patch(
  '/edit-user/:id',
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El nombre solo puede contener letras y los siguientes caracteres especiales: -'"
    ),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El apellido solo puede contener letras y los siguientes caracteres especiales: - '"
    ),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio.')
    .isLength({ min: 5, max: 100 })
    .withMessage('El email debe contener entre 5 y 100 caracteres.')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    .withMessage('El correo electrónico debe tener un formato válido.')
    .custom(emailValidation),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 50 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
    .withMessage('La contraseña debe tener letras y números.'),
  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 50 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
    .withMessage('La contraseña debe tener letras y números.'),
  check('lang')
    .isIn(['es', 'en'])
    .withMessage('El idioma debe ser español o inglés.'),
  body('cart')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  body('disabled')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  body('roleAdmin')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
  jwtValidatorUser,
  editUser
);

route.get('/disable-user/:id', jwtValidatorAdmin, disableUser);

route.delete('/delete-user/:id', jwtValidatorAdmin, deleteUser);

route.patch('/add-tocart/:id', jwtValidatorUser, addtoCart);

route.get('/get-cart/:id', jwtValidatorUser, getCart)

module.exports = route;
