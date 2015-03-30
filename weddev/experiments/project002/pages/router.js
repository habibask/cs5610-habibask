var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/slideshow.html'
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
          when('/pollution', {
              templateUrl: 'pages/pollution.html',
              controller: 'pollutionController'
          }).
          when('/addride', {
              templateUrl: 'pages/add-ride.html',
              controller: 'addridecontroller'
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
    $scope.loginfail = null;
    $scope.regfail = '';
    $scope.login = function (user) {
        console.log(user);
        LoginService.login(user, function () {
            console.log(LoginService.getloginfail());
            if (LoginService.getloginfail() == true) {
                $scope.loginfail = true;
            } else {
                $scope.loginfail = null;

            }
        });

    }

    $scope.addInfo = function (user) {
        $scope.regfail = '';
        LoginService.add(user, function (res) {
            console.log("Error forwared to Router js");
            console.log(res.errors);

            for (var field in res.errors) {
                if (res.errors.hasOwnProperty(field)) {
                    var message = res.errors[field].message;
                    $scope.regfail += " || "+res.errors[field].message
                    console.log(res.errors[field].message);
                }
            }
        });
    };
});

app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
           if (currentUser != null) {
               if (currentUser.userType == 'driver') {
                   $scope.isDriver = true;
               } else {
                   $scope.isDriver = null;
               }
           }
           console.log("controller current user " + currentUser);
       }, true);

    $scope.isActive = function (route) {

        return route === $location.path();
    }

    $scope.logout = function () {
        LoginService.logout();
        $scope.loginfail = null;
        $scope.isDriver = null;
    }
});