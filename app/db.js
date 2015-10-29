/**
 *	app/db.js
 *	connection to mongoDB
 */

var mongoose = require("mongoose");



//-- env
var db_host = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
var db_port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var db_name = process.env.OPENSHIFT_APP_NAME || "nj";
var db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "";
var db_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "";
// var db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "admin";
// var db_pass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "PHIXjVy9_6er";



var export_obj = {};

export_obj.connection = null;
export_obj.connect = function(){
	// mongoose.connect('mongodb://username:password@host:port/database?options...');
	// mongoose.connect("mongodb://"+db_host+":"+db_port+"/"+db_name);
	mongoose.connect("mongodb://"+db_user+":"+db_pass+"@"+db_host+":"+db_port+"/"+db_name);
	export_obj.connection = mongoose.connection;

	export_obj.connection.on("error", console.error.bind(console, 'connection error:'));

	export_obj.connection.once('open', function (callback) {
	    console.log("connection open");
	});
};

export_obj.close = function(){
	export_obj.connection.close();
};


module.exports = export_obj;










//-- simple
//  mongoose.connect('mongodb://localhost/nj');

//  var db = mongoose.connection;

//  db.on("error", console.error.bind(console, 'connection error:'));
//  db.once('open', function (callback) {
//     console.log("open");
// });

// module.exports = db;
