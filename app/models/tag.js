/**
 *
 */
var mongoose = require("mongoose");


var scheme = mongoose.Schema({
    name: String,
    created: Date,
    updated: { type: Date, default: Date.now }
});

var model = mongoose.model("Tag", scheme);


module.exports = model;
