'use strict';

angular.module('liveApp')
.factory('Auth', function ($http, $q) {

  var STORAGE_ID = 'united-camp-live';
  var user = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    'login' : function(user){
      var deferred = $q.defer();
      $http.post('http://united-camp-live.dev/users/auth', user).
        success(function(data, status, headers, config) {
          user = data;
          localStorage.setItem(STORAGE_ID, JSON.stringify(user));
          deferred.resolve(user);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },
    'logout' : function(){
      user = {};
      return user;
    },
    'getUser' : function(){
      return user;
    },
    'isLoggedIn' : function(){
      return user.email ? true : false;
    }
  };
});
