var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
const studentRouter = require('./routes/studentRoute');
const teacherRouter = require('./routes/teacherRoute');
const instructorRouter = require('./routes/instructorRoute');
const lessonRouter = require('./routes/lessonRoute');
const examRouter = require('./routes/examRoute');
const sequelizeInit = require('./config/sequelize/init');

sequelizeInit()
  .catch(err => {
    console.log(err);
});

const stuApiRouter = require('./routes/api/StudentApiRoute');
const insApiRouter = require('./routes/api/InstructorApiRoute');
const lessonApiRouter = require('./routes/api/LessonApiRoute');




var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('secret'));

// create session
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

// make session available to templates
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  const loggedUserType = req.session.loggedUserType;
  res.locals.loggedUser = loggedUser;
  res.locals.loggedUserType = loggedUserType;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});


// init languages 
const i18n = require('i18n');
i18n.configure({
   locales: ['gj', 'en'], 
   directory: path.join(__dirname, 'locales'), 
   objectNotation: true, //
   cookie: 'acme-hr-lang', 
});
app.use(i18n.init); 

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});


const authUtil = require('./util/authUtils');

//Aliia here user router
app.use('/', indexRouter);
app.use('/student', authUtil.permitAuthenticatedAdminUser, studentRouter);
app.use('/tcher', authUtil.permitAuthenticatedAdminUser, teacherRouter);
app.use('/course', authUtil.permitAuthenticatedAdminUser, instructorRouter);
app.use('/lesson', authUtil.permitAuthenticatedUser, lessonRouter);
app.use('/exam', authUtil.permitAuthenticatedUser, examRouter);

app.use('/api/students', stuApiRouter);
app.use('/api/instructors', insApiRouter);
app.use('/api/lessons', lessonApiRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
