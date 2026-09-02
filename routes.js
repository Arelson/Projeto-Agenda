const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController.js')
const loginController = require('./src/controllers/loginController.js')


//Rotas da home
route.get("/", homeController.index);

// Rotas de Login
route.get('/login/', loginController.index);

module.exports = route;
