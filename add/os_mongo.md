GitHub Readme
=============


MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: PHIXjVy9_6er
   Database Name: nj

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/





Examples
========

https://github.com/openshift-quickstart/openshift-mongo-node-express-example/blob/master/server.js

	var mongodb = require('mongodb');

	self.dbServer = new mongodb.Server(
		process.env.OPENSHIFT_MONGODB_DB_HOST,parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT)
		);
  	
  	self.db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, self.dbServer, {auto_reconnect: true});
  	self.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
  	self.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

  	self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
  	self.port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;
  	if (typeof self.ipaddr === "undefined") {
    	console.warn('No OPENSHIFT_NODEJS_IP environment variable');
  	};




  	self.connectDb = function(callback){
    	self.db.open(function(err, db){
      if(err){ throw err };
      self.db.authenticate(self.dbUser, self.dbPass, {authdb: "admin"}, function(err, res){
        if(err){ throw err };
        callback();
      });
    });
  	};



https://blog.openshift.com/getting-started-with-mongodb-on-nodejs-on-openshift/

	// default to a 'localhost' configuration:
	var connection_string = '127.0.0.1:27017/YOUR_APP_NAME';
	// if OPENSHIFT env variables are present, use the available connection info:
	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	  process.env.OPENSHIFT_APP_NAME;
	}