(function(){
	"use strict";




	var app = angular.module("songsApp", ["ngRoute", "ui-notification"]);



	app.config(['$interpolateProvider', function ($interpolateProvider) {
			$interpolateProvider.startSymbol('[[');
			$interpolateProvider.endSymbol(']]');
		}]);

	app.config(function(NotificationProvider) {
		NotificationProvider.setOptions({
			delay: 10000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 10,
			horizontalSpacing: 10,
			positionX: 'left',
			positionY: 'bottom'
		});
	});


	app.config(["$routeProvider", function($routeProvider){
		$routeProvider.when("/main", {
			templateUrl : "/js_view/songs/main.html",
			controller: "MainCtrl"
		});


		$routeProvider.when("/edit/:song_id", {
			templateUrl : "/js_view/songs/edit.html",
			controller: "EditCtrl"
		});

		$routeProvider.when("/song/:song_id", {
			templateUrl : "/js_view/songs/song.html",
			controller: "SongCtrl"
		});


		$routeProvider.when("/singer/:singer_id", {
			templateUrl : "/js_view/songs/singer.html",
			controller: "SingerCtrl"
		});

		$routeProvider.when("/singers/", {
			templateUrl : "/js_view/songs/singers.html",
			controller: "SingersCtrl"
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




	app.run(function($rootScope, svcData, Notification, notify, $location){
		$rootScope.data = svcData.data;
		svcData.get_singers();

		// $rootScope.select_singer = function(singer){
		// 	svcData.data.singer = singer;
		// 	$location.path( "/singer/"+singer._id );
		// }


		// Notification("hello");
		// Notification("hello");
		// Notification("hello");
		// Notification("hello");

		// notify.n_info("");
		// notify.n_info("info");
		// notify.n_info("info", "INFO");
		// notify.n_primary("primary");
		// notify.n_success("success");
		// notify.n_warning("warning");
		// notify.n_error("error");

	});



	/**
	 * обёртка над Notification
	 * https://github.com/alexcrack/angular-ui-notification
	 */
	app.factory("notify", function(Notification){
		return {
			n_info: function(text, title){
				Notification.info({message: text || "---", title: title || ""});
			},

			n_primary: function(text, title){
				Notification.primary({message: text || "---", title: title || ""});
			},

			n_success: function(text, title){
				Notification.success({message: text || "---", title: title || ""});
			},

			n_warning: function(text, title){
				Notification.warning({message: text || "---", title: title || ""});
			},

			n_error: function(text, title){
				Notification.error({message: text || "---", title: title || ""});
			}
		};
	});



})();