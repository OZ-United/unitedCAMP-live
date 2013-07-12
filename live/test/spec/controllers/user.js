'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('liveApp'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
    });
  }));

});
