require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.BD_URL_CONNECT)
  .then(() => {
    console.log("Banco Conectado.");
    app.emit("Banco Conectado!!");
  })
  .catch((e) => console.log(e));

const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes.js');
const path = require('path');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware.js');

const helmet = require('helmet');
const csrf = require('csurf');

const port = 3000;

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOP = session({
  secret: "#h0-=xSdII+_U;n$`j8",
  store: MongoStore.create({mongoUrl: process.env.BD_URL_CONNECT}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
});

app.use(sessionOP);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(middlewareGlobal);

app.use(routes);

//CRUD -> CREATE, READ, UPDATE, DELETE
//        POST    GET   PUT     DELETE

app.on('Banco Conectado!!', () => {
  app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  });
});

