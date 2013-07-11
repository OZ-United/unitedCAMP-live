'use strict';

angular.module('liveApp')
.controller('UserCtrl', function ($scope, Auth, $location) {
  $scope.logout = function(){
    Auth.logout();
    $location.path('/');
  };

  $scope.cancel = function(){
    $location.path('/');
  };
});
