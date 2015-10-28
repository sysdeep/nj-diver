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



// router.get("/songs/:id?", function(req, res, next){
router.get("/songs/", function(req, res, next){
	console.log("all songs");
	Song.find(function(err, songs){
		
		if(err){
			console.log(err);
			res.status(500).send(err);
		}else{
			res.status(200).send(songs);
		}
	});

});



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




router.get("/songs/:id", function(req, res, next){
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


router.post("/songs", function(req, res, next){
	if( Object.keys(req.body).length > 0 ){
		var song = new Song(req.body);
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



router.put("/songs/:id", function(req, res, next){
	console.log("put");
	Song.findById( req.params.id, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{
			song.name = req.body.name;
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


router.patch("/songs/:id", function(req, res, next){
	console.log("patch");




	Song.findById( req.params.id, function(err, song){
		if(err){
			res.status(500).send(err);
		}else{

			if( req.body._id ){
				delete req.body._id;
			}
			if( req.body.__v ){
				delete req.body.__v;
			}

			for(var p in req.body){
				song[p] = req.body[p];
			}
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




router.delete("/songs/:id", function(req, res, next){
	console.log("delete");

	Song.findById( req.params.id, function(err, song){
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

module.exports = router;
