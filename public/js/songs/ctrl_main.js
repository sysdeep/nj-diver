(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("MainCtrl", function($scope, $location, svcData){
		$scope.data = svcData.data;
		$scope.data.current_view = "main";

		if(svcData.data.songs_need_update)
			svcData.get_songs();



		$scope.refresh = function(){
			svcData.get_songs();
		}


		$scope.show_song = function(song){
			console.log(song);
			// svcData.data.current_song = song;
			$location.path( "/song/"+song._id );
		}

		$scope.edit_song = function(song){
			// svcData.data.song = song;
			$location.path( "/edit/"+song._id );
		}

		$scope.remove_song = function(song){
			svcData.data.song = song;
			// $location.path( "/song/"+song._id );
			svcData.remove_song();
			// $location.path( "/main/" );

		}

		$scope.add = function(){
			// svcData.set_default_song();
			$location.path( "/edit/0" );
		}

		// $scope.refresh_limit = function(){
		// 	svcData.get_logs_limit();
		// }
	});




})();