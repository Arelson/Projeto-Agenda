const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController.js')
const loginController = require('./src/controllers/loginController.js')
const contatoController = require('./src/controllers/contatoController.js')
const { loginRequired } = require('./src/middleware/middleware.js')


//Rotas da home
route.get("/", homeController.index);

// Rotas de Login
route.get('/login/', loginController.index);
route.post('/login/register', loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//rotas de contato
route.get('/contato/', loginRequired, contatoController.index);
route.post("/contato/register", loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post("/contato/edit/:id", loginRequired, contatoController.edit);

module.exports = route;
