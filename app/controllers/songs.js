/**
 * songs.js
 */

var model_song 		= require("../models/song");
var model_singer 	= require("../models/singer");


"use strict";

var songs = {};
module.exports = songs;


var song_prepare = function(data){
	var o_data = {};

	var singer = {
		"name": data.singer.name,
		"_id": data.singer._id
	}

	o_data.name 		= data.name 		|| "";	// название
	// o_data.singer		= data.singer 		|| "";	// исполнитель
	// o_data.singer_id	= data.singer_id	|| "";	// исполнитель
	o_data.singer = singer;
	o_data.author		= data.author 		|| "";	// автор
    o_data.album		= data.album		|| "";	// альбом
    o_data.text			= data.text 		|| "";	// текст
    o_data.description	= data.description 	|| "";	// доп. описание
	o_data.genre		= data.genre		|| ""; 	// жанр
	// o_data.created		= new Date();					// дата создания
	o_data.updated		= new Date();					// дата изменения
	o_data.api 			= 1;

	return o_data;
}


songs.create_song = function(data, _cb){

	var save_data = song_prepare(data);
	save_data.created = new Date();

	// songs.singer_find_or_create(save_data.singer);

	var song = new model_song(save_data);
	song.save(function(err, song){
		if(err){
			_cb(err, null);
		}else{
			_cb(null, song);
		}
	});

}




songs.singer_find_or_create = function(singer_name){
	model_singer.find({name: singer_name}, function(err, singer){
		if(!singer.length){
			var singer = new model_singer({name: singer_name});
			singer.save();
		}
	});
}


songs.update_song = function(id, data, _cb){
	var save_data = song_prepare(data);
	console.log(save_data);

	// songs.singer_find_or_create(save_data.singer);

	model_song.findOneAndUpdate({_id: id}, save_data, function(err, song){
		if(err){
			_cb(err, null)
		}else{
			_cb(null, song)
		}
	});
}





songs.remove_song = function(id, _cb){
	model_song.findById( id, function(err, song){
		if(err){
			_cb(err, null);
			return 1;
		}

		song.remove(function(err){
			if(err){
				_cb(err, null);
			}else{
				_cb(null, null);
			}
		});
			
	});
}




songs.create_singer = function(data, _cb){
	var singer = new model_singer({name: data.name});
	singer.save(function(err, singer){
		if(err){
			_cb(err, null);
		}else{
			_cb(null, singer);
		}
	});
}



songs.update_singer = function(id, data, _cb){

	var save_data = {"name": data.name};
	model_singer.findById(id, function(err, singer){
		if(err){
			_cb(err, null);	
		}else{



			// model_song.where({"singer_id": singer._id}).update({"singer": singer.name});
			model_song.update({"singer._id": singer._id}, {"singer.name": data.name}, {multi: true}, function(err, num){
				console.log("updated songs with singer: ", num);
			});


			singer.name = data.name;
			singer.save(function(err, singer){
				if(err){
					_cb(err, null)
				}else{
					console.log(singer);
					_cb(null, singer)
				}	
			});
		}

	});

}


songs.remove_singer = function(id, _cb){

	model_singer.findById( id, function(err, singer){
		if(err){
			_cb(err, null);
			return 1;
		}

		singer.remove(function(err){
			if(err){
				_cb(err, null);
			}else{
				_cb(null, singer);
			}
		});
			
	});

}