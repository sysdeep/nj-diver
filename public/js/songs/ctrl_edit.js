(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("EditCtrl", function($scope, svcData){
        $scope.data = svcData.data;
        $scope.data.current_view = "edit";
        var self = this;


        $scope.save = function(){
            if( svcData.data.song._id === undefined ){
                svcData.create_song();
                // self.create();
            }else{
                // self.update();
                svcData.update_song();
            }
        }




        // self.create = function(){
        //     svcData.create_song();
        // }


        // self.update = function(){

        // }


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