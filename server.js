#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var routes  = require('./app/routes');
var http    = require('http');
var path    = require('path');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    // self.populateCache = function() {
    //     if (typeof self.zcache === "undefined") {
    //         self.zcache = { 'index.html': '' };
    //     }

    //     //  Local cache for static content.
    //     self.zcache['index.html'] = fs.readFileSync('./index.html');
    // };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    // self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    // self.createRoutes = function() {
    //     self.routes = { };

    //     self.routes['/asciimo'] = function(req, res) {
    //         var link = "http://i.imgur.com/kmbjB.png";
    //         res.send("<html><body><img src='" + link + "'></body></html>");
    //     };

    //     self.routes['/'] = function(req, res) {
    //         res.setHeader('Content-Type', 'text/html');
    //         res.send(self.cache_get('index.html') );
    //     };
    // };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    // self.initializeServer = function() {
    //     self.createRoutes();
    //     self.app = express.createServer();

    //     //  Add handlers for the app (from the routes).
    //     for (var r in self.routes) {
    //         self.app.get(r, self.routes[r]);
    //     }
    // };


    /**
     *  Initializes the sample application.
     */
    // self.initialize = function() {
    //     self.setupVariables();
    //     // self.populateCache();
    //     self.setupTerminationHandlers();

    //     // Create the express server and routes.
    //     self.initializeServer();
    // };


    /**
     *  Start the server (starts up the sample application).
     */
    // self.start = function() {
    //     //  Start the app on the specific interface (and port).
    //     self.app.listen(self.port, self.ipaddress, function() {
    //         console.log('%s: Node server started on %s:%d ...',
    //                     Date(Date.now() ), self.ipaddress, self.port);
    //     });
    // };



    // Web app urls
    self.app  = express();
  

    //This uses the Connect frameworks body parser to parse the body of the post request
    self.app.configure(function () {
        self.app.use(express.bodyParser());
        self.app.use(express.methodOverride());
        self.app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

        //--- template
        self.app.set('views', __dirname + '/app/views');
        self.app.set('view engine', 'ejs');
        
        // self.app.use(express.favicon());
        // self.app.use(express.logger('dev'));
        // self.app.use(express.cookieParser('your secret here'));
        // self.app.use(express.session());
        // self.app.use(self.app.router);
        // self.app.use(require('stylus').middleware(__dirname + '/public'));

        //--- public
        self.app.use(express.static(path.join(__dirname, 'public')));
    });

    //define all the url mappings
    self.app.get("/", routes.index);
    self.app.get("/about", routes.about);
    self.app.get("/release", routes.release);
    // self.app.get('/users', user.list);




    //starting the nodejs server with express
    self.startServer = function(){
        self.setupVariables();
        self.setupTerminationHandlers();

        self.app.listen(self.port, self.ipaddress, function(){
        console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    }





};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
// zapp.initialize();
zapp.startServer();

