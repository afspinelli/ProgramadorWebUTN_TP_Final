var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

require("dotenv").config();

var pool = require('./models/bd');  //  bd.js

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login')
var adminTutorialsRouter = require('./routes/admin/tutorials')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "7hAH#^WtQLT88<aETZZg",
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try {
    // console.log(req.session.id);
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}


/* app.get("/", function (req, res) {
  var conocido = Boolean(req.session.nombre);

  res.render("index", {
    conocido: conocido,
    nombre: req.session.nombre
  });
}); */

/* app.post("/ingresar", function (req, res) {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre
  }
  res.redirect("/");
}); */

/* app.get("/salir", function (req, res) {
  req.session.destroy();
  res.redirect("/");
}); */


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/tutorials', secured, adminTutorialsRouter);

//select
/* pool.query('select * from empleados').then(function(resultados){
  console.log(resultados);
}); */

//insert
/* var obj = {
    nombre: 'Carlos',
    apellido: 'Lopez',
    trabajo: 'Programador',
    edad: 28,
    salario: 70000,
    mail: 'carlosl@bignet.com'
}

pool.query('insert into empleados set ?', [obj]).then(function(resultados){
  console.log(resultados);
}); */

//update
/* var id = 23;
var obj = {
    nombre: 'Gustavo'
}

pool.query('update empleados set ? where id_emp=?', [obj, id]).then(function(resultados){
  console.log(resultados);
});
 */

//delete
/* var id = 22;
pool.query('delete from empleados where id_emp=?', [id]).then(function(resultados){
  console.log(resultados);
}); */


/* app.use(function (req, res, next) {
  // si no existe la variable de sesion vistas la creamos como un objeto vacio
  if (!req.session.vistas) {
    req.session.vistas = {};
  }
  // buscamos una clave dentro de session.vistas que coincida con la url actual, 
  // si no existe, la inicializamos en 1. Si existe, sumamos 1 al contador de esa ruta

  if (!req.session.vistas[req.originalUrl]) {
    req.session.vistas[req.originalUrl] = 1;
  } else {
    req.session.vistas[req.originalUrl]++;
  }
  next();
}); */


/* app.get("/test", function (req, res) {
  // pasamos al template la variable vistas con el numero devuelto por la clave que pedimos
  res.render("pagina", {
    pagina: "Middleware Test",
    vistas: req.session.vistas[req.originalUrl]
  });
});
 */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
