var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/home2.html',
          }).
          when('/about', {
              templateUrl: 'pages/about.html',
              controller: 'registerController'
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

app.controller("registerController", function ($scope,$sce, $http,LoginService) {
    $scope.addInfo = function () {
        var newLogin = {
            Name: $scope.login.name,
            username: $scope.login.username,
            password: $scope.login.password,
            message: $scope.login.message
        };

        LoginService.add(newLogin);
    };

    $scope.checkInfo = function () {
        console.log($scope.login.usernameLogin);

        LoginService.login($scope.login.usernameLogin, $scope.login.passwordlogin, function (uname, message) {
            $scope.userinfo = $sce.trustAsHtml("<h3>Hi " + uname + "<h3><h4>" + "Your message is - <br>" + message + "</h4>");

        });
    };



    $(".home").click(function () {
        $(".home").addClass("active");
        $(".about").removeClass("active");
        $(".login").removeClass("active");
        $(".register").removeClass("active");
    });

    $(".about").click(function () {
        $(".about").addClass("active");
        $(".home").removeClass("active");
        $(".login").removeClass("active");
        $(".register").removeClass("active");

    });

    $(".login").click(function () {
        $(".login").addClass("active");
        $(".home").removeClass("active");
        $(".about").removeClass("active");
        $(".register").removeClass("active");

    });

    $(".register").click(function () {
        $(".register").addClass("active");
        $(".home").removeClass("active");
        $(".about").removeClass("active");
        $(".login").removeClass("active");

    });

});