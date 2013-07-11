'use strict';

angular.module('liveApp')
.factory('Auth', function ($http, $q, $rootScope) {
  var STORAGE_ID = 'united-camp-live';
  $rootScope.rootuser = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    'login' : function(user){
      var deferred = $q.defer();
      $http.post('http://united-camp-live.dev/users/auth', user).
        success(function(user, status, headers, config) {
          $rootScope.rootuser = user;
          localStorage.setItem(STORAGE_ID, JSON.stringify(user));
          deferred.resolve(user);
        }).
        error(function(user, status, headers, config) {
          deferred.reject(user);
        });

      return deferred.promise;
    },
    'logout' : function(){
      $rootScope.rootuser = {};
      localStorage.setItem(STORAGE_ID, JSON.stringify($rootScope.rootuser));
      return $rootScope.rootuser;
    },
    'getUser' : function(){
      return $rootScope.rootuser;
    },
    'isLoggedIn' : function(){
      return $rootScope.rootuser.email ? true : false;
    }
  };
});
