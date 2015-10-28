(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("MainCtrl", function($scope, $location, svcData){
        $scope.data = svcData.data;

        if(!svcData.data.songs_loaded)
        	svcData.get_songs();



        $scope.refresh = function(){
        	svcData.get_songs();
        }


        $scope.show_song = function(song){
            console.log(song);
            // svcData.data.current_song = song;
            $location.path( "/song/"+song._id );
        }

        // $scope.refresh_limit = function(){
        // 	svcData.get_logs_limit();
        // }
    });




})();