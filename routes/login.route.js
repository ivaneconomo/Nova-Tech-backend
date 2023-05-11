const {Router}=require('express');
const route =Router();
const {login}= require('../controllers/login.controller')

route.post('/',login);

module.exports = route;