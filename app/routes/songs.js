/**
 * songs.js
 * songs router
 */
var express     = require('express');
var router      = express.Router();
var Song 		= require("../models/song");
var model_singer = require("../models/singer");

var controller_songs = require("../controllers/songs");



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

		controller_songs.create(req.body, function(err, song){
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


			model_singer.find({name: song.singer}, function(err, docs){
				if(!docs.length){
				var singer = new model_singer({name: song.singer});
					singer.save();
				}
			});

			song.save(function(err, song){
				if(err){
					res.status(500).send(err);
				}else{
					res.status(201).send(song);
				}
			});		
		}
	});







	// var id = req.body._id;
	// var singer_name = req.body.singer;
	// var singer_id = 0;


	// var query = model_singer.find({name: singer_name});
	// var promise = query.exec();
	// promise.then(function(doc){
 // 		if(doc.length){
 // 			singer_id = doc._id;
 // 		}

 // 		console.log(singer_id);
	// });


	// console.log(singer_id);
	// res.send("ok");


	// model_singer.find({name: singer_name}, function(err, singer){
	// 	if(!singer.length){
	// 		var singer = new model_singer({name: song.singer});
	// 		singer.save(function(singer){
	// 			singer_id = singer._id;
	// 			console.log("created singer", singer);
	// 			return singer;
	// 		});
	// 	}else{
	// 		console.log("found singer: "+ singer);
	// 		singer_id = singer._id;
	// 		return singer;
	// 	}
	// })
	// .then(function(singer){
		
	// 	console.log("start update song", singer);

	// 	Song.findById( id, function(err, song){
	// 		if(err){
	// 			res.status(500).send(err);
	// 		}else{
			
	// 			console.log(singer_id);

	// 			song.name 			= req.body.name;
	// 			song.singer			= req.body.singer;					// исполнитель
	// 			song.singer_id		= singer_id;					// исполнитель
	// 			song.author			= req.body.author;					// автор
	// 	    	song.album			= req.body.album;					// альбом
	// 	    	song.text			= req.body.text;					// текст
	// 	    	song.description	= req.body.description;					// доп. описание
	// 	    	// song.// tags		= Array;				// теги
	// 			song.genre			= req.body.genre; 					// жанр
	// 			// song.created		= req.body.name;					// дата создания
	// 			song.updated		= new Date();					// дата изменения
	// 			// song.api 		= 1


			

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




















router.get("/get_singers/", function(req, res, next){
	// console.log("all songs");
	model_singer.find(function(err, docs){
		
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(docs);
		}
	});

});



router.get("/get_singer/:id", function(req, res, next){
	model_singer.findById(req.params.id, function(err, docs){
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(docs);
		}
	});

});


router.post("/get_songs_singer/", function(req, res, next){

	console.log(req.body);

	Song.find({"singer": req.body.name}, function(err, docs){
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(docs);
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
