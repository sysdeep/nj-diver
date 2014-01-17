/*
| 	GET home page.
*/

exports.index = function(req, res){
  	res.render('index', { 
  		title: 'Express',
  		messg: "Epress for diver"
  	});
};




exports.about = function(req, res){
  	res.render('about', { 
  		title: 'Express',
  		messg: "Epress for diver"
  	});
};



/*
|	Releases page
*/
exports.release = function(req, res){

	var path    = require('path');
	var fs = require('fs')
	var markdown = require( "markdown" ).markdown;


	
	var filename = "Release.md";
	var filepath = path.join(__dirname, "../../" + filename);
	var mdtext = fs.readFileSync(filepath, 'utf8');
	var html_text = markdown.toHTML( mdtext );


  	res.render('release', { 
  		title: 'Release',
  		text: html_text
  	});
};