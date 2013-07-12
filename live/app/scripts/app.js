'use strict';

angular.module('liveApp', ['ngResource'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        'user': ['Auth', function(Auth){
          var user = Auth.getUser();
          console.log(user);
          return user;
        }]
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
}])
.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth){
  $rootScope.$on( '$routeChangeStart', function(event, next, current) {
    console.log(next.templateUrl);

    if ( Auth.isLoggedIn() ) {
      if ( next.templateUrl == 'views/auth.html' ) {
        $location.path( '/' );
      } else {
        // $location.path( '/auth' );
      }
    }
  });
}]);
