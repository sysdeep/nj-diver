/*
| 	GET home page.
*/

exports.index = function(req, res){
  res.render('index', { 
  		title: 'Express',
  		messg: "Epress for diver"
  	});
};