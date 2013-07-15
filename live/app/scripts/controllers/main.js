'use strict';

angular.module('liveApp')
.controller('MainCtrl', ['$scope', 'Message', 'Auth', 'user', function ($scope, Message, Auth, user) {

  var getFrom = function(){
    return $scope.messages && $scope.messages.length && $scope.messages[$scope.messages.length -1].date || new Date().toISOString();
  };

  $scope.from = getFrom();
  $scope.messages = Message.query({'from': $scope.from}, function(messages){
    console.log(JSON.stringify(messages));
  }, function(err){
    console.log(JSON.stringify(err));
  });
  $scope.user = user;

  $scope.showupdate = true;

  $scope.reloadMessages = function(){
    $scope.showupdate = false;
    $scope.messages = Message.query({}, function(messages){
      $scope.newMessages = [];
      $scope.showupdate = true;
      // console.log(JSON.stringify(messages));
    }, function(err){
      console.log(JSON.stringify(err));
    });
  };

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
  window.setTimeout(function(){

    var source = new EventSource('/messages/watch');

    source.addEventListener('message', function(e) {
      var data = JSON.parse(e.data);
      $scope.newMessages.splice(0, 0, data);
      console.log(data);
      $scope.$apply();
    }, false);

    source.addEventListener('error', function(e) {
    }, false);

  }, 1000);
}]);
