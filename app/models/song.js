/**
 *
 */
var mongoose = require("mongoose");


var scheme = mongoose.Schema({
    name: String,
    text: String,
    description: String,
    tags: Array,
    created: Date,
    updated: { type: Date, default: Date.now }
});

var model = mongoose.model("Song", scheme);


module.exports = model;
