'use strict';

angular.module('liveApp')
.controller('MainCtrl', function ($scope, Message, Auth) {
  $scope.from = $scope.messages && $scope.messages[$scope.messages.length -1].date || new Date().toISOString();
  $scope.messages = Message.query({'from': $scope.from});
  $scope.user = Auth.getUser();
});
