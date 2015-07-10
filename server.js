// #!/bin/env node
/**
 * server.js
 * main server
 */


// server instance
var server 	= require("./app/server");
var db 		= require("./app/db");

// run server
server.startServer();
