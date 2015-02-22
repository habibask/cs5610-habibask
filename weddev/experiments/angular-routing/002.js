var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/home1.html',
          }).
        when('/about', {
            templateUrl: 'pages/about.html',
        }).
        when('/notify', {
            templateUrl: 'pages/notify.html',
            controller: 'registerController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("registerController", function ($scope, $http) {

    $scope.registeredusers = [];

    $scope.addEmail = function () {
        var newLogin = {
            Email: $scope.login.email
        };


        $scope.registeredusers.push(newLogin);
        $scope.login.email = "";

    };

        $(".about").click(function () {
            $(".about").addClass("active");
            $(".home").removeClass("active");
            $(".notify").removeClass("active");

        });

        $(".home").click(function () {
            $(".home").addClass("active");
            $(".about").removeClass("active");
            $(".notify").removeClass("active");

        });

        $(".notify").click(function () {
            $(".notify").addClass("active");
            $(".home").removeClass("active");
            $(".about").removeClass("active");
        });
    });