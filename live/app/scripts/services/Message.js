'use strict';

angular.module('liveApp')
.factory('Message', ['$resource', function ($resource) {
  var origin = window.location.protocol + '//' + window.location.host;
  console.log(origin);
  return $resource('http://united-camp-live.janantala.com/messages/:query:messageId', { messageId: '@messageId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'POST', headers: { 'X-App-Origin': origin}, params: { from: '@from', query: 'query' }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
}]);
