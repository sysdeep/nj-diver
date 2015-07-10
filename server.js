// #!/bin/env node
/**
 * server.js
 * main server
 */


// server instance
var server 	= require("./app/server");
var db 		= require("./app/db");


// run db
db.connect();




// run server
server.startServer();
