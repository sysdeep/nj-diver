(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("EditCtrl", function($scope, svcData){
        $scope.data = svcData.data;

        // if(!svcData.data.logs_loaded)
        // 	svcData.get_logs();



        // $scope.refresh = function(){
        // 	svcData.get_logs();
        // }

        // $scope.refresh_limit = function(){
        // 	svcData.get_logs_limit();
        // }
    });




})();