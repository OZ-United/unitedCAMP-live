'use strict';

angular.module('liveApp')
.controller('UserCtrl', function ($scope, Auth, $location) {
  $scope.user = JSON.parse(JSON.stringify(Auth.getUser()));
  $scope.user.password = '';

  $scope.logout = function(){
    Auth.logout();
    $location.path('/');
  };

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.update = function(){
    if ($scope.loginForm.$valid) {
      Auth.update($scope.user)
        .then(function(user){
          console.log(user);
          $location.path( '/' );
        },
        function(err){
          console.log(err);
        });
    }
  };
});
