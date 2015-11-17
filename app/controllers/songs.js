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

	o_data.name 		= data.name 		|| "";	// название
	o_data.singer		= data.singer 		|| "";	// исполнитель
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


songs.create = function(data, _cb){

	var save_data = song_prepare(data);
	save_data.created = new Date();

	songs.singer_find_or_create(save_data.singer);

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


// songs.update = function(id, data, _cb){
// 	var save_data = song_prepare(data);

// 	model_song.findById(id, function(err, song){
		
// 	})

// 	// model_singer.find({name: song.singer}, function(err, docs){
// 	// 			if(!docs.length){
// 	// 			var singer = new model_singer({name: song.singer});
// 	// 				singer.save();
// 	// 			}
// 	// 		});
// }