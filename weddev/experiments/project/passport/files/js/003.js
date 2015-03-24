var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/maincarousel/page.html'
          }).
          when('/profile', {
              templateUrl: 'pages/profile.html',
              controller: 'registerController',
              resolve: { loggedin: checkLoggedin }
          }).
        when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'registerController'
        }).
        when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'registerController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

var checkLoggedin = function ($q, $timeout, $http, $location) {

    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {

        if (user != '0') {
            console.log("logged in");

            deferred.resolve();
        } else {
            console.log("Not Found");

            deferred.reject();
            $location.url("/login");
        }

    });

};

app.controller("registerController", function ($scope, $sce, $http, LoginService) {
    $scope.currentUser = LoginService.currentUser;

    $scope.login = function (user) {
        console.log(user);
        LoginService.login(user);
    }

    $scope.addInfo = function (user) {

        LoginService.add(user);

    };

  

    $(".home").click(function () {
        $(".home").addClass("active");
        $(".profile").removeClass("active");
        $(".login").removeClass("active");
        $(".register").removeClass("active");
    });

    $(".profile").click(function () {
        $(".profile").addClass("active");
        $(".home").removeClass("active");
        $(".login").removeClass("active");
        $(".register").removeClass("active");

    });

    $(".login").click(function () {
        $(".login").addClass("active");
        $(".home").removeClass("active");
        $(".profile").removeClass("active");
        $(".register").removeClass("active");

    });

    $(".register").click(function () {
        $(".register").addClass("active");
        $(".home").removeClass("active");
        $(".profile").removeClass("active");
        $(".login").removeClass("active");

    });

});

app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
           console.log("controller current user " + currentUser);
       }, true);

    $scope.isActive = function (route) {

        return route === $location.path();
    }

    $scope.logout = function () {
        LoginService.logout();
    }
});