(function(){
	"use strict";




	var app = angular.module("songsApp");


	app.factory("svcData", function($rootScope, $http){

		var data = {

			"songs": [],
			"songs_count": 0,
			"songs_loaded": false,

			"song": {},
			"song_loaded": false,

			
			"filter": {
				"date_start": "0000-00-00",
				"date_end": "3000-12-31",

				"time_start": "00:00:00",
				"time_end": "23:59:59",
			}
			
		};



		// function get_log_files(){
		//     data.log_files_loaded = false;
		//     $http.get("/log_files").success(function (response) {
		//         data.log_files = response;
		//         get_log_file(data.log_files[0]);
		//         $rootScope.$broadcast("logs_loaded");
		//         data.log_files_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.log_files_loaded = true;
		//     });
		// }

		// function get_log_file(file){
		//     data.log_file_loaded = false;
		//     $http.post("/log_file", {file: file}).success(function (response) {
		//         data.log_content = response;
		//         data.log_file_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.log_file_loaded = true;
		//     });
		// }


		function get_songs(){
			data.songs_loaded = false;
			$http.get("/songs/get_songs").success(function (response) {
				data.songs = response;
				data.songs_loaded = true;
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.songs_loaded = true;
			});
		}


		function get_song(id){
			data.song_loaded = false;

			$http.get("/songs/get_song/"+id).success(function (response) {
				data.song = response;
				data.song_loaded = true;
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.song_loaded = true;
			});
		}

		// function get_apps(){
		//     data.apps_loaded = false;
		//     $http.get("./api/v1/apps").success(function (response) {
		//         data.apps = response;
		//         data.apps_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.apps_loaded = true;
		//     });
		// }


		// function get_logs_limit(){
		//     data.logs_loaded = false;
		//     var send_data = data.filter;
		//     $http.post("./api/v1/log_limit", send_data).success(function (response) {
		//         data.logs = response;
		//         data.logs_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.logs_loaded = true;
		//     });
		// }

		// function get_events_limit(page, pcount){
		//     data.events_loaded = false;
		//     var send_data = {
		//         "page": page,
		//         "pcount": pcount
		//     };

		//     $http.post("/events_limit", send_data).success(function (response) {
		//         data.events = response.events;
		//         data.events_count = response.events_count;
		//         data.events_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.events_loaded = true;
		//     });
		// }





		// function get_data_dirs(file_type){
		//     data.data_dirs_loaded = false;
		//     data.data_files = [];
		//     $http.post("/blg_data_dirs", {file_type: file_type}).success(function (response) {
		//         data.data_dirs = response;
		//         data.data_dirs_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.data_dirs_loaded = true;
		//     });
		// }



		// function get_data_files(file_type, dir){
		//     data.data_files_loaded = false;
		//     $http.post("/blg_data_files", {file_type: file_type, dir: dir}).success(function (response) {
		//         data.data_files = response;
		//         data.data_files_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.data_files_loaded = true;
		//     });
		// }


		//  function get_data_file(file_type, dir, file){
		//     data.data_file_loaded = false;
		//     $http.post("/blg_data_file", {file_type: file_type, dir: dir, file: file}).success(function (response) {
		//         data.data_file = response;
		//         data.data_file_loaded = true;
		//     }).error(function(response){
		//         console.log("error");
		//         console.log(response);
		//         data.data_file_loaded = true;
		//     });
		// }







		return {
			"data": data,
			"get_songs": get_songs,
			"get_song": get_song,
			// "get_logs_limit": get_logs_limit,
			// "get_apps": get_apps,
			// "get_events_limit": get_events_limit,
			// "get_log_files": get_log_files,
			// "get_log_file": get_log_file,

			// "get_data_dirs": get_data_dirs,
			// "get_data_files": get_data_files,
			// "get_data_file": get_data_file
		}




	});
})();
