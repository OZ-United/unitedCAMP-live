'use strict';

angular.module('liveApp', ['ngResource'])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/auth', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function($rootScope, $location, Auth){
  $rootScope.$on( '$routeChangeStart', function(event, next, current) {
    console.log(next.templateUrl);

    if ( !Auth.isLoggedIn() ) {
      if ( next.templateUrl == '/views/login.html' ) {

      } else {
        $location.path( '/auth' );
      }
    }
  });
});
