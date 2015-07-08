/**
 * songs.js
 * songs router
 */
var express     = require('express');
var router      = express.Router();




router.get("/", function(req, res, next){

    var data = {
        title: 'Express',
        messg: "Epress for diver"
    };
    res.render('songs/main', data);
});


module.exports = router;
