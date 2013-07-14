'use strict';

angular.module('liveApp')
.factory('Auth', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
  var STORAGE_ID = 'united-camp-live';
  $rootScope.rootuser = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    'login' : function(user){
      var deferred = $q.defer();
      $http.post('/users/auth', user).
        success(function(user, status, headers, config) {
          $rootScope.rootuser = user;
          localStorage.setItem(STORAGE_ID, JSON.stringify(user));
          deferred.resolve(user);
        }).
        error(function(data, status, headers, config) {
          alert(data.message || 'Nepodarilo sa vykonať akciu');
          deferred.reject(data);
        });

      return deferred.promise;
    },
    'update' : function(user){
      var deferred = $q.defer();
      $http.put('/users/' + user.userId, user).
        success(function(user, status, headers, config) {
          $rootScope.rootuser = user;
          localStorage.setItem(STORAGE_ID, JSON.stringify(user));
          deferred.resolve(user);
        }).
        error(function(data, status, headers, config) {
          alert(data.message || 'Nepodarilo sa vykonať akciu');
          deferred.reject(data);
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
      return $rootScope.rootuser.login ? true : false;
    }
  };
}]);
