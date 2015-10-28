(function(){
	"use strict";




	var app = angular.module("songsApp", ["ngRoute"]);



	app.config(['$interpolateProvider', function ($interpolateProvider) {
         	$interpolateProvider.startSymbol('[[');
         	$interpolateProvider.endSymbol(']]');
    	}]);


    app.config(["$routeProvider", function($routeProvider){
		$routeProvider.when("/main", {
            templateUrl : "/js_view/songs/main.html",
            controller: "MainCtrl"
        });


        $routeProvider.when("/edit", {
            templateUrl : "/js_view/songs/edit.html",
            controller: "EditCtrl"
        });

        $routeProvider.when("/song/:song_id", {
            templateUrl : "/js_view/songs/song.html",
            controller: "SongCtrl"
        });

        // $routeProvider.when("/logs", {
        //     templateUrl : "./views/partial/logs.html",
        //     controller: "LogsCtrl"
        // });

        // $routeProvider.when("/events", {
        //     templateUrl : "/static/js_view/events.html",
        //     controller: "EventsCtrl"
        // });

        // $routeProvider.when("/logs", {
        //     templateUrl : "/static/js_view/logs.html",
        //     controller: "LogsCtrl"
        // });

        // $routeProvider.when("/data_files", {
        //     templateUrl : "/static/js_view/data_files.html",
        //     controller: "DataFilesCtrl"
        // });

        $routeProvider.otherwise({redirectTo: '/main'});
	}]);




    app.run(function($rootScope, svcData){
        $rootScope.data = svcData.data;
    });



})();