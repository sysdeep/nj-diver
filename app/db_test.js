var db = require("./db");
// var kitty = require("./models/kitty");
var song = require("./models/song");
var tag = require("./models/tag");




var s1 = new song({
    name: "Scooter",
    text: "Scooter song text",
    description: "Scooter song",
    tags: [1,2,3],
    created: Date.now()
});


var tag1 = new tag({name: "hardcore"});
var tag2 = new tag({name: "trance"});


// var igor = new kitty({name: "Pasha"});
// console.log(igor.name);




db.on('open', function (callback) {

    // tag1.save();
    // tag2.save();
    // s1.save(function(err, song){
    //    if(err){
    //        console.log("error save ->", err);
    //    }else{
    //        console.log(song);
    //    }
    //
    //
    //
    //    db.close();
    // });

    // tag.find(function(err, docs){
    //     if(err){
    //            console.log("error save ->", err);
    //        }else{
    //            console.dir(docs);
    //
    //
    //             song.findOne({name: "Scooter"}, function(err, song){
    //                song.tags = [];
    //
    //                docs.forEach(function(tag){
    //                     var id = tag._id;
    //
    //                     song.tags.push(id);
    //                });
    //
    //                console.log(song);
    //                song.save();
    //             });
    //
    //
    //
    //        }
    //
    //
    //
    // })



    song.find(function(err, docs){
        if(err){
               console.log("error save ->", err);
           }else{
               console.dir(docs);
           }



    });


    // igor.save(function(err, igor){
    //    if(err){
    //        console.log("error save ->", err);
    //    }else{
    //        console.log(igor.name);
    //    }
    //
    //
    //
    // //    db.close();
    // });


    // kitty.find({name: "Igor"}, function(err, docs){
    // kitty.find( function(err, docs){
    //     if(err){
    //            console.log("error save ->", err);
    //        }else{
    //            console.dir(docs);
    //        }
    //
    //
    //
    //        db.close();
    // })

});
