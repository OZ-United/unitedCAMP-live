'use strict';

angular.module('liveApp')
.factory('Auth', function ($http, $q) {

  var user = {};
  var isLoggedIn = false;

  return {
    'login' : function(user){
      var deferred = $q.defer();
      $http.post('http://united-camp-live.dev/users/auth', user).
        success(function(data, status, headers, config) {
          user = data;
          isLoggedIn = true;
          deferred.resolve(user);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },
    'logout' : function(){
      user = {};
      isLoggedIn = false;
      return user;
    },
    'getUser' : function(){
      return user;
    },
    'isLoggedIn' : function(){
      return isLoggedIn;
    }
  };
});
