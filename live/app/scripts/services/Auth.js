'use strict';

angular.module('liveApp')
.factory('Auth', function ($http, $q) {

  var user = {};
  var isLoggedIn = false;

  return {
    'login' : function(email, password){
      var deferred = $q.defer();
      $http.post('http://united-camp-live.dev/users/auth', {'email': email, 'password': password}).
        success(function(data, status, headers, config) {
          user = data;
          isLoggedIn = true;
          deferred.resolve(user);
        }).
        error(function(data, status, headers, config) {
          deferred.reject();
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
