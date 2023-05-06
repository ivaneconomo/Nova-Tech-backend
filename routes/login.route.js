// // solo traigo el post 
const {Router}=require('express');
const routeLog =Router();
const {login}= require('../controllers/login.controller')

routeLog.post('/',login);

module.exports = routeLog;