/**
 * app.js
 */



var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
// var config 		= require("./config");
var swig 		= require("swig");
// var session 	= require('express-session');


var r_index  = require('./routes/index');





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


//--- local vars
// self.app.locals.version = config.version;
// self.app.locals.server = "1.1.1.1";

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


// self.app.set('view engine', 'ejs');

// self.app.use(express.favicon());
// self.app.use(express.logger('dev'));
// self.app.use(express.cookieParser('your secret here'));
// self.app.use(express.session());
// self.app.use(self.app.router);
// self.app.use(require('stylus').middleware(__dirname + '/public'));

//--- public
app.use(express.static(path.join(__dirname, "..", 'public')));



//-- routes ---------------------------------------------------------------
app.use('/',            r_index);                // main + gui
// app.use('/devices',     r_devices);             // devices service
// app.use('/settings',    r_settings);            // devices service
// app.use('/action',  r_action);              // gui rest actions

//app.use('/users', users);
//app.use('/storage', r_storage);

// app.use("/api/v1", api_1);                  // REST api 1
// app.use("/api/v2", api_2);                  // REST api 2
//-- routes ---------------------------------------------------------------

//define all the url mappings
// self.app.get("/", routes.index);
// self.app.get("/about", routes.about);
// self.app.get("/release", routes.release);
// self.app.get('/users', user.list);


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
