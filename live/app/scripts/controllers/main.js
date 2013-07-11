'use strict';

angular.module('liveApp')
.controller('MainCtrl', function ($scope, Message, Auth) {

  var getFrom = function(){
    return $scope.messages && $scope.messages[$scope.messages.length -1].date || new Date().toISOString();
  };

  $scope.from = getFrom();
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

  $scope.loadMore = function(){
    $scope.from = getFrom();
    Message.query({'from': $scope.from}, function(more){
      console.log(more);
      $scope.messages = $scope.messages.concat(more);
      if (more.length === 0) {
        $scope.nomore = true;
      }
    });
  };

  $scope.showNewMessages = function(){
    $scope.messages = $scope.newMessages.concat($scope.messages);
    $scope.newMessages = [];
  };

  $scope.newMessages = [];
  var source = new EventSource('http://united-camp-live.dev/messages/watch');

  source.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);
    $scope.newMessages.splice(0, 0, data);
    console.log(data);
    $scope.$apply();
  }, false);

  source.addEventListener('error', function(e) {
    console.log(e);
  }, false);
});
