// #!/bin/env node




var server = require("./app/server");



server.startServer();

// /**
//  * OpenShift sample Node application
//  */
//
// var app     = require("./app.js");
// var debug   = require('debug')('cconf_js:server');
// var http    = require('http');
//
//
// /**
//  *  Define the sample application.
//  */
// var NodeApp = function() {
//
//     //  Scope.
//     var self = this;
//
//
//     /*  ================================================================  */
//     /*  Helper functions.                                                 */
//     /*  ================================================================  */
//
//     /**
//      *  Set up server IP address and port # using env variables/defaults.
//      */
//     self.setupVariables = function() {
//         //  Set the environment variables we need.
//         self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//         self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//
//         if (typeof self.ipaddress === "undefined") {
//             //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
//             //  allows us to run/test the app locally.
//             console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
//             self.ipaddress = "127.0.0.1";
//         };
//     };
//
//
//     /**
//      *  terminator === the termination handler
//      *  Terminate server on receipt of the specified signal.
//      *  @param {string} sig  Signal to terminate on.
//      */
//     self.terminator = function(sig){
//         if (typeof sig === "string") {
//            console.log('%s: Received %s - terminating sample app ...',
//                        Date(Date.now()), sig);
//            process.exit(1);
//         }
//         console.log('%s: Node server stopped.', Date(Date.now()) );
//     };
//
//
//     /**
//      *  Setup termination handlers (for exit and a list of signals).
//      */
//     self.setupTerminationHandlers = function(){
//         //  Process on exit and signals.
//         process.on('exit', function() { self.terminator(); });
//
//         // Removed 'SIGPIPE' from the list - bugz 852598.
//         ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//          'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
//         ].forEach(function(element, index, array) {
//             process.on(element, function() { self.terminator(element); });
//         });
//     };
//
//
//     // self.app  = express();
//     //
//     //
//     // //This uses the Connect frameworks body parser to parse the body of the post request
//     // // self.app.use(express.bodyParser());
//     // // self.app.use(express.methodOverride());
//     // // self.app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//     //
//     // //--- template
//     // self.app.set('views', __dirname + '/app/views');
//     // self.app.engine("html", swig.renderFile);
//     // self.app.set('view engine', 'html');
//     // // Swig will cache templates for you, but you can disable
//     // // that and use Express's caching instead, if you like:
//     // self.app.set('view cache', false);
//     // // To disable Swig's cache, do the following:
//     // swig.setDefaults({ cache: false });
//     // // NOTE: You should always cache templates in a production environment.
//     // // Don't leave both of these to `false` in production!
//     //
//     //
//     // //--- local vars
//     // // self.app.locals.version = config.version;
//     // self.app.locals.server = "1.1.1.1";
//     //
//     // // uncomment after placing your favicon in /public
//     // //app.use(favicon(__dirname + '/public/favicon.ico'));
//     // self.app.use(logger('dev'));
//     // self.app.use(bodyParser.json());
//     // self.app.use(bodyParser.urlencoded({ extended: false }));
//     // // app.use(cookieParser());
//     // // app.use(express.session({secret: '1234567890QWERTY'}));
//     // // app.use(session({
//     // // 	secret: 'comcon secret',
//     // // 	resave: false,
//     // //   	saveUninitialized: true,
//     // //   	cookie: {
//     // //         maxAge: 3600000 * 1             // 1 day
//     // //         // secure: true
//     // //     }
//     // // }));
//     //
//     //
//     // // self.app.set('view engine', 'ejs');
//     //
//     // // self.app.use(express.favicon());
//     // // self.app.use(express.logger('dev'));
//     // // self.app.use(express.cookieParser('your secret here'));
//     // // self.app.use(express.session());
//     // // self.app.use(self.app.router);
//     // // self.app.use(require('stylus').middleware(__dirname + '/public'));
//     //
//     // //--- public
//     // self.app.use(express.static(path.join(__dirname, 'public')));
//     //
//     //
//     //
//     // //-- routes ---------------------------------------------------------------
//     // self.app.use('/',            r_index);                // main + gui
//     // // app.use('/devices',     r_devices);             // devices service
//     // // app.use('/settings',    r_settings);            // devices service
//     // // app.use('/action',  r_action);              // gui rest actions
//     //
//     // //app.use('/users', users);
//     // //app.use('/storage', r_storage);
//     //
//     // // app.use("/api/v1", api_1);                  // REST api 1
//     // // app.use("/api/v2", api_2);                  // REST api 2
//     // //-- routes ---------------------------------------------------------------
//     //
//     // //define all the url mappings
//     // // self.app.get("/", routes.index);
//     // // self.app.get("/about", routes.about);
//     // // self.app.get("/release", routes.release);
//     // // self.app.get('/users', user.list);
//     //
//     //
//     // //--- 404 ---------------------------------------------------------------------
//     // /**
//     //  * отлов ошибки 404
//     //  * т.к. роутов больше нет, а никто из вышестоящих не отработал, то принимаем решение, что такого роута не существует
//     //  * устанавливаем переменные ошибки и передаём управление дальше - next
//     //  */
//     // self.app.use(function(req, res, next) {
//     //     var err = new Error('Not Found');
//     //     err.status = 404;
//     //     next(err);
//     // });
//     // //--- 404 ---------------------------------------------------------------------
//     //
//     //
//     //
//     //
//     // //--- error handlers ----------------------------------------------------------
//     //
//     // /**
//     //  *  обработчик ошибок
//     //  *  в любом случае ошибки возврвщаем json объект со статусом ошибки
//     //  */
//     // self.app.use(function(err, req, res, next){
//     //     res.status(err.status || 500);
//     //     res.send({
//     //         message: err.message,
//     //         status: err.status
//     //     });
//     // });
//     //
//     //
//     // /**
//     //  * старые обработчики - с отображением кастомной страницы ошибки
//     //  * пока отключены
//     //  */
//     // // development error handler
//     // // will print stacktrace
//     // //if (app.get('env') === 'development') {
//     // //    app.use(function(err, req, res, next) {
//     // //        res.status(err.status || 500);
//     // //        res.render('error', {
//     // //            message: err.message,
//     // //            error: err
//     // //        });
//     // //    });
//     // //}
//     //
//     // // production error handler
//     // // no stacktraces leaked to user
//     // //app.use(function(err, req, res, next) {
//     // //    res.status(err.status || 500);
//     // //    res.render('error', {
//     // //        message: err.message,
//     // //        error: {}
//     // //        //error: err
//     // //    });
//     // //});
//     // //--- error handlers ----------------------------------------------------------
//
//
//
//
//
//     //starting the nodejs server with express
//     self.startServer = function(){
//         self.setupVariables();
//         self.setupTerminationHandlers();
//
//         app.set('port', self.port);
//
//         /**
//          * Create HTTP server.
//          */
//         self.server = http.createServer(app);
//
//
//         /**
//          * Listen on provided port, on all network interfaces.
//          */
//         self.server.listen(self.port);
//         console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
//         // log.info("server started on port: " + port);
//         // models.sequelize.sync().then(function(){
//         //     server.listen(port);
//         //     log.info("server started on port: " + port);
//         // });
//
//
//
//
//         self.server.on('error', self.onError);
//         self.server.on('listening', self.onListening);
//
//         // self.app.listen(self.port, self.ipaddress, function(){
//         // console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
//         // });
//     }
//
//
//
//     /**
//      * Event listener for HTTP server "listening" event.
//      */
//
//     self.onListening = function() {
//     	var addr = self.server.address();
//     	var bind = typeof addr === 'string'
//     		? 'pipe ' + addr
//     		: 'port ' + addr.port;
//     	debug('Listening on ' + bind);
//     };
//
//     /**
//      * Event listener for HTTP server "error" event.
//      */
//
//     self.onError = function(error) {
//     	if (error.syscall !== 'listen') {
//     		throw error;
//     	}
//
//     	var bind = typeof port === 'string'
//     		? 'Pipe ' + port
//     		: 'Port ' + port
//
//     	// handle specific listen errors with friendly messages
//     	switch (error.code) {
//     		case 'EACCES':
//     			console.error(bind + ' requires elevated privileges');
//     			process.exit(1);
//     			break;
//     		case 'EADDRINUSE':
//     			console.error(bind + ' is already in use');
//     			process.exit(1);
//     			break;
//     		default:
//     			throw error;
//     	}
//     }
//
//
// };
//
//
//
//
//
//
//
//
//
//
//
//
// /**
//  *  main():  Main code.
//  */
// var zapp = new NodeApp();
// // zapp.initialize();
// zapp.startServer();
