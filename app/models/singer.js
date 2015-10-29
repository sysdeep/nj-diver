/**
 *
 */
var mongoose = require("mongoose");


var scheme = mongoose.Schema({
    name: String,					// название исполнителя
    created: Date,					// дата создания
    updated: { type: Date, default: Date.now },	// дата изменения
    api: { type: Number, default: 1 }						// версия документа
});

var model = mongoose.model("Singer", scheme);


module.exports = model;
