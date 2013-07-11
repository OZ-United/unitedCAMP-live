'use strict';

angular.module('liveApp')
.controller('AuthCtrl', function ($scope, Auth, $location) {
  $scope.login = function(){
    if ($scope.loginForm.$valid) {
      Auth.login($scope.user)
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
