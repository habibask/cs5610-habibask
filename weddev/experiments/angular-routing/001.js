var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/home.html',
          }).
        when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'registerController'
        }).
        when('/contacts', {
            templateUrl: 'pages/contacts.html',
            controller: 'registerController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("registerController", function ($scope, $http) {
    $(".about").click(function () {
        $(".about").addClass("active");
        $(".home").removeClass("active");
        $(".contacts").removeClass("active");

    });

    $(".home").click(function () {
        $(".home").addClass("active");
        $(".about").removeClass("active");
        $(".contacts").removeClass("active");

    });

    $(".contacts").click(function () {
        $(".contacts").addClass("active");
        $(".home").removeClass("active");
        $(".about").removeClass("active");
    });
});

