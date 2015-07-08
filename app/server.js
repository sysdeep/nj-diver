#!/bin/env node
/**
 * app/server.js
 * application server module
 */

var app     = require("./app.js");
var debug   = require('debug')('cconf_js:server');
var http    = require('http');


var server = {};        // export object
var IPADDRESS = "";     // ip
var PORT = 0;           // port

/**
 * setup ip and port
 */
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
       console.log('%s: Received %s - terminating app ...',
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



/**
 * starting the nodejs server with express
 */
server.startServer = function(){
    setupVariables();               // setup ip and port
    setupTerminationHandlers();     // setup term handlers

    app.set('port', PORT);          // set app port

    // starting listenning
    app.listen(PORT, IPADDRESS, function(){
        console.log('%s: Node server started on %s:%d ...', Date(Date.now()), IPADDRESS, PORT);
    });
}


module.exports = server;
