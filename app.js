var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var bodyparser=require('body-parser')
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port=4000
app.listen(port,()=>{
  console.log('Server is running at port'+port);
})
const uri="mongodb+srv://satyainnowide:innowideserver@innowide.lkdx2.mongodb.net/?retryWrites=true&w=majority&appName=Innowide"
mongoose.connect(uri)
.then(()=>console.log('Connect to MongoDB'))
.catch((err)=>console.log('Error connecting to MongoDB', err));

module.exports = app;
