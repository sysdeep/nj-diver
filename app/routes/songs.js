/**
 * songs.js
 * songs router
 */
var express     = require('express');
var router      = express.Router();
var Song 		= require("../models/song");



router.get("/", function(req, res, next){

    var data = {
        title: 'Express',
        messg: "Epress for diver"
    };
    res.render('songs', data);
});



// // router.get("/songs/:id?", function(req, res, next){
// router.get("/songs/", function(req, res, next){
// 	console.log("all songs");
// 	Song.find(function(err, songs){
		
// 		if(err){
// 			console.log(err);
// 			res.status(500).send(err);
// 		}else{
// 			res.status(200).send(songs);
// 		}
// 	});

// });



router.get("/get_songs/", function(req, res, next){
	// console.log("all songs");
	Song.find(function(err, songs){
		
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(songs);
		}
	});

});




// router.get("/songs/:id", function(req, res, next){
// 	console.log("find by id");
// 	Song.findById(req.params.id, function(err, song){
// 		if(err){
// 			console.log(err);
// 			res.status(500).send(err);
// 		}else{
// 			res.status(200).send(song);
// 		}
// 	});

// });



router.get("/get_song/:id", function(req, res, next){
	console.log("find by id");
	Song.findById(req.params.id, function(err, song){
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(song);
		}
	});

});




router.post("/create_song", function(req, res, next){
	if( Object.keys(req.body).length > 0 ){

		// console.log(req.body);
		// if( req.body._id )
		// 	delete req.body._id;
		// console.log(req.body);
		var save_data = {};

		save_data.name 			= req.body.name;
		save_data.singer		= req.body.singer;					// исполнитель
		save_data.author		= req.body.author;					// автор
	    save_data.album			= req.body.album;					// альбом
	    save_data.text			= req.body.text;					// текст
	    save_data.description	= req.body.description;					// доп. описание
	    // save_data.// tags		= Array;				// теги
		save_data.genre			= req.body.genre; 					// жанр
		save_data.created		= new Date();					// дата создания
		save_data.updated		= new Date();					// дата изменения
		save_data.api 			= 1;



		var song = new Song(save_data);
		song.save(function(err, song){
			if(err){
				res.status(500).send(err);
			}else{
				res.status(201).send(song);
			}
		});
		
	}else{
		res.status(500).send("no input body");
	}
	
});




router.post("/update_song", function(req, res, next){

	var id = req.body._id;
	Song.findById( id, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{
			

			song.name 			= req.body.name;
			song.singer			= req.body.singer;					// исполнитель
			song.author			= req.body.author;					// автор
		    song.album			= req.body.album;					// альбом
		    song.text			= req.body.text;					// текст
		    song.description	= req.body.description;					// доп. описание
		    // song.// tags		= Array;				// теги
			song.genre			= req.body.genre; 					// жанр
			// song.created		= req.body.name;					// дата создания
			song.updated		= new Date();					// дата изменения
			// song.api 		= 1




			song.save(function(err, song){
				if(err){
					res.status(500).send(err);
				}else{
					res.status(201).send(song);
				}
			});		
		}
	});
	
	
});






router.post("/remove_song", function(req, res, next){
	var id = req.body._id;
	Song.findById( id, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{

			song.remove(function(err){
				if(err){
					res.status(500).send(err);
				}else{
					console.log("removed");
					res.status(204).send("removed");
				}
			});
			
		}
	});
	
	
});



// router.post("/songs", function(req, res, next){
// 	if( Object.keys(req.body).length > 0 ){
// 		var song = new Song(req.body);
// 		song.save(function(err, song){
// 			if(err){
// 				res.status(500).send(err);
// 			}else{
// 				res.status(201).send(song);
// 			}
// 		});
		
// 	}else{
// 		res.status(500).send("no input body");
// 	}
	
// });



// router.put("/songs/:id", function(req, res, next){
// 	console.log("put");
// 	Song.findById( req.params.id, function(err, song){
// 		if(err){
// 			res.status(500).send(err);
// 		}else{
// 			song.name = req.body.name;
// 			song.save(function(err, song){
// 				if(err){
// 					res.status(500).send(err);
// 				}else{
// 					res.status(201).send(song);
// 				}
// 			});		
// 		}
// 	});
	
	
// });


// router.patch("/songs/:id", function(req, res, next){
// 	console.log("patch");




// 	Song.findById( req.params.id, function(err, song){
// 		if(err){
// 			res.status(500).send(err);
// 		}else{

// 			if( req.body._id ){
// 				delete req.body._id;
// 			}
// 			if( req.body.__v ){
// 				delete req.body.__v;
// 			}

// 			for(var p in req.body){
// 				song[p] = req.body[p];
// 			}
// 			song.save(function(err, song){
// 				if(err){
// 					res.status(500).send(err);
// 				}else{
// 					res.status(201).send(song);
// 				}
// 			});	
// 		}
// 	});
	
	
// });




// router.delete("/songs/:id", function(req, res, next){
// 	console.log("delete");

// 	Song.findById( req.params.id, function(err, song){
// 		if(err){
// 			res.status(500).send(err);
// 		}else{

// 			song.remove(function(err){
// 				if(err){
// 					res.status(500).send(err);
// 				}else{
// 					console.log("removed");
// 					res.status(204).send("removed");
// 				}
// 			});
			
// 		}
// 	});
	
	
// });

module.exports = router;
