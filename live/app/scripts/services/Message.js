'use strict';

angular.module('liveApp')
.factory('Message', ['$resource', function ($resource) {
  return $resource('http://united-camp-live.dev/messages/:messageId', { messageId: '@messageId', from: '@from' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
}]);
