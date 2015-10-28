/**
 * app.js
 * create express app
 */



var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var swig 		= require("swig");

var config 		= require("../config");
// var cookieParser = require('cookie-parser');
// var session 	= require('express-session');

//-- routes
var r_index     = require('./routes/index');
var r_songs     = require('./routes/songs');




//-- app
app  = express();


//--- template
app.set('views', __dirname + '/views');
app.engine("html", swig.renderFile);
app.set('view engine', 'html');
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
//--- template

//--- local vars
app.locals.VERSION = config.VERSION;
// self.app.locals.server = "1.1.1.1";
//--- local vars


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(express.session({secret: '1234567890QWERTY'}));
// app.use(session({
// 	secret: 'comcon secret',
// 	resave: false,
//   	saveUninitialized: true,
//   	cookie: {
//         maxAge: 3600000 * 1             // 1 day
//         // secure: true
//     }
// }));



//--- public
app.use(express.static(path.join(__dirname, "..", 'public')));



//-- routes ---------------------------------------------------------------
app.use('/',            r_index);                // main
app.use('/songs',       r_songs);               // songs

// app.use("/api/v1", api_1);                  // REST api 1
// app.use("/api/v2", api_2);                  // REST api 2
//-- routes ---------------------------------------------------------------



//--- 404 ---------------------------------------------------------------------
/**
 * отлов ошибки 404
 * т.к. роутов больше нет, а никто из вышестоящих не отработал, то принимаем решение, что такого роута не существует
 * устанавливаем переменные ошибки и передаём управление дальше - next
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//--- 404 ---------------------------------------------------------------------




//--- error handlers ----------------------------------------------------------
/**
 *  обработчик ошибок
 *  в любом случае ошибки возврвщаем json объект со статусом ошибки
 */
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        message: err.message,
        status: err.status
    });
});


/**
 * старые обработчики - с отображением кастомной страницы ошибки
 * пока отключены
 */
// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//        //error: err
//    });
//});
//--- error handlers ----------------------------------------------------------


module.exports = app;
