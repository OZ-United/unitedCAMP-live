'use strict';

angular.module('liveApp', ['ngResource'])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        'user': function(Auth){
          var user = Auth.getUser();
          console.log(user);
          return user;
        }
      }
    })
    .when('/auth', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/user', {
      templateUrl: 'views/user.html',
      controller: 'UserCtrl'
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
        // $location.path( '/auth' );
      }
    }
  });
});
