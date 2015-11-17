/**
 *
 */
var mongoose = require("mongoose");


var scheme = mongoose.Schema({
    singer: String,                 // исполнитель
	singer_id: mongoose.Schema.Types.ObjectId,			// исполнитель id
	author: String,					// автор
    name: String,					// название песни
    album: String,					// альбом
    text: String,					// текст
    description: String,			// доп. описание
    tags: Array,					// теги
    genre: String, 					// жанр
    created: Date,					// дата создания
    updated: { type: Date, default: Date.now },	// дата изменения
    api: { type: Number, default: 1 }						// версия документа
});

var model = mongoose.model("Song", scheme);


module.exports = model;
