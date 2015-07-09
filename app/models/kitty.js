var mongoose = require("mongoose");


var scheme = mongoose.Schema({
    name: String
});

var model = mongoose.model("Kitten", scheme);


module.exports = model;
