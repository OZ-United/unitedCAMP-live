'use strict';

angular.module('liveApp')
.controller('MainCtrl', function ($scope, Message, Auth) {
  $scope.from = $scope.messages && $scope.messages[$scope.messages.length -1].date || new Date().toISOString();
  $scope.messages = Message.query({'from': $scope.from});
  $scope.user = Auth.getUser();

  $scope.post = function(){
    if ($scope.postForm.$valid) {
      $scope.message.author = $scope.user.userId;
      Message.create($scope.message, function(message){
        console.log('posted');
      });
      $scope.message = {};
    }
  };

  $scope.remove = function(message){
    var index = $scope.messages.indexOf(message);
    if (index < 0) { return false; }

    Message.remove({'messageId': $scope.messages[index].messageId}, function(){
      $scope.messages.splice(index, 1);
    });
  };
});
