'use strict';

// angular.module('liveApp')
// .factory('myHttpInterceptor', function($q) {
//   return function(promise) {
//     return promise.then(function(response) {
//       // do something on success
//       console.log('myHttpInterceptor');
//       response.data = response.data.replace(/OK\[/, '[');
//       console.log(JSON.stringify(response.data));

//       return response;
//     }, function(response) {
//       // do something on error

//       return $q.reject(response);
//     });
//   };
// });

// angular.module('liveApp').config(function ($httpProvider) {
//     $httpProvider.responseInterceptors.push('myHttpInterceptor');
// });

angular.module('liveApp')
.factory('Message', ['$resource', function ($resource) {
  var origin = window.location.protocol + '//' + window.location.host;
  console.log(origin);
  return $resource('/messages/:query:messageId', { messageId: '@messageId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', headers: { 'X-App-Origin': origin}, params: { from: '@from', query: 'query' }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
}]);
