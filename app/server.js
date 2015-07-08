#!/bin/env node
/**
 * OpenShift sample Node application
 */

var app     = require("./app.js");
var debug   = require('debug')('cconf_js:server');
var http    = require('http');


var server = {};
var IPADDRESS = "";
var PORT = 0;

function setupVariables() {
    //  Set the environment variables we need.
    IPADDRESS = process.env.OPENSHIFT_NODEJS_IP;
    PORT      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

    if (typeof IPADDRESS === "undefined") {
        //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
        //  allows us to run/test the app locally.
        console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
        IPADDRESS = "127.0.0.1";
    };
};


/**
 *  terminator === the termination handler
 *  Terminate server on receipt of the specified signal.
 *  @param {string} sig  Signal to terminate on.
 */
function terminator(sig){
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
function setupTerminationHandlers(){
    //  Process on exit and signals.
    process.on('exit', function() { terminator(); });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
};




//starting the nodejs server with express
server.startServer = function(){
    setupVariables();
    setupTerminationHandlers();

    app.set('port', PORT);

    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);


    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(PORT);
    // console.log('%s: Node server started on %s:%d ...', Date(Date.now()), IPADDRESS, PORT);
    // log.info("server started on port: " + port);
    // models.sequelize.sync().then(function(){
    //     server.listen(port);
    //     log.info("server started on port: " + port);
    // });




    server.on('error', onError);
    server.on('listening', onListening);

    // self.app.listen(self.port, self.ipaddress, function(){
    // console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
    // });
}



    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        console.log('%s: Node server started on %s:%d ...', Date(Date.now()), IPADDRESS, PORT);
    	// var addr = self.server.address();
    	// var bind = typeof addr === 'string'
    	// 	? 'pipe ' + addr
    	// 	: 'port ' + addr.port;
    	// debug('Listening on ' + bind);
    };

    /**
     * Event listener for HTTP server "error" event.
     */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof PORT === 'string'
		? 'Pipe ' + port
		: 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}





module.exports = server;







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
