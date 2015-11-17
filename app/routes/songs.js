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

		controller_songs.create_song(req.body, function(err, song){
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

	console.log(req.body);

	var id = req.body._id;

	controller_songs.update_song(id, req.body, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(song);
		}
	});
	
	
});






router.post("/remove_song", function(req, res, next){
	var id = req.body._id;
	controller_songs.remove_song(id, function(err){
		if(err){
			res.status(500).send(err);
		}else{
			console.log("removed");
			res.status(204).send("removed");
		}
	})
	
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





router.post("/create_singer/", function(req, res, next){

	console.log(req.body);


	controller_songs.create_singer(req.body, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(song);
		}
	});


});



router.post("/update_singer/", function(req, res, next){

	console.log(req.body);


	controller_songs.update_singer(req.body._id, req.body, function(err, singer){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(singer);
		}
	});


});



router.post("/remove_singer/", function(req, res, next){

	console.log(req.body);

	controller_songs.remove_singer(req.body._id, function(err, singer){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(singer);
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
