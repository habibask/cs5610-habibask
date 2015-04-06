var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/slideshow.html'
          }).
          when('/profile', {
              templateUrl: 'pages/profile.html',
              controller: 'profilecontroller',
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
              controller: 'addridecontroller',
              resolve: { loggedin: checkLoggedin }
          }).
          when('/searchride', {
              templateUrl: 'pages/search-ride.html',
              controller: 'searchridescontroller'
          }).
        otherwise({
            redirectTo: '/profile'
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

app.controller("registerController", function ($scope, $sce, $http, $location, LoginService) {

    $scope.currentUser = LoginService.currentUser;
    $scope.loginfail = '';
    $scope.regfail = '';

    $scope.login = function (user) {

        $(".username").css({
            'box-shadow': 'none',
            'outline': 'none',
            'border-color': 'none'

        });
        $(".password").css({
            'box-shadow': 'none',
            'outline': 'none',
            'border-color': 'none'
        });

        if (user == null) {
            $scope.loginfail = "You should enter username and password to explore"
            $(".username").css({
                'box-shadow': '0 0 10px crimson',
                'outline': 'none',
                'border-color': '#9ecaed'
            });
            $(".password").css({
                'box-shadow': '0 0 10px crimson',
                'outline': 'none',
                'border-color': '#9ecaed'
            });

        } else {
            if ($.trim(user.username) == '') {
                $(".username").css({
                    'box-shadow': '0 0 10px crimson',
                    'outline': 'none',
                    'border-color': '#9ecaed'
                });
                $scope.loginfail = "Enter username";
            } else {
                if ($.trim(user.password) == '') {
                    $(".password").css({
                        'box-shadow': '0 0 10px crimson',
                        'outline': 'none',
                        'border-color': '#9ecaed'
                    });
                    $scope.loginfail = " Enter password";
                } else {
                    LoginService.login(user, function () {
                        console.log(LoginService.getloginfail());
                        if (LoginService.getloginfail() == true) {
                            $scope.loginfail = 'Incorrect credentials';
                        } else {
                            $scope.loginfail = '';

                        }
                    });
                }
            }
        }
    }
    var fields = ["name", "username", "password", "email", "passwordtemp", "personalmessage",
        "usertype", "carnumber", "carmodel", "carcapacity", "authorized",
        "address1", "city", "state"];

    var carfields = ["carnumber", "carmodel", "carcapacity", "authorized"]

    $scope.addInfo = function (user) {

        for (var field in fields) {
            $("." + fields[field]).css({
                'box-shadow': 'none',
                'outline': 'none',
                'border-color': 'none'
            });
        }


        var fieldsEntered = [];
        var pass = '';
        var verifypass = '';
        var ignorecarinfo = false;
        $scope.regfail = '';
        if (user == null) {
            $scope.regfail = "You cannot escape from entering the form"
            for (var field in fields) {
                $("." + fields[field]).css({
                    'box-shadow': '0 0 10px crimson',
                    'outline': 'none',
                    'border-color': '#9ecaed'
                });
            }
        } else {
            //get all the fields that are entered
            for (var field in user) {

                if (user.hasOwnProperty(field)) {

                    var message = user[field];
                    if (field == 'password') {
                        pass = user[field];
                    }
                    if (field == 'passwordtemp') {
                        verifypass = user[field];
                    }
                    if (field == 'usertype') {
                        if (message == 'sharer') {
                            ignorecarinfo = true;
                        } else {
                            ignorecarinfo = false;
                        }
                    }
                    if ($.trim(message) != '') {
                        fieldsEntered.push(field);
                    }
                }
            }
            //get all the fields that are not entered
            console.log(unenteredFields);

            var unenteredFields = fields.filter(function (el) {
                return (fieldsEntered.indexOf(el) < 0 && (ignorecarinfo == false || (ignorecarinfo == true && carfields.indexOf(el) < 0)));
            });

            if (unenteredFields.length != 0) {

                $scope.regfail = "Fields ";

                //add focus and show the field in the message regfail
                for (var field in unenteredFields) {
                    $("." + unenteredFields[field]).css({
                        'box-shadow': '0 0 10px crimson',
                        'outline': 'none',
                        'border-color': '#9ecaed'
                    });
                    $scope.regfail += unenteredFields[field] + ", ";

                }
                $scope.regfail += "are to be entered";
            }

            if ($scope.regfail == '' && pass != verifypass) {
                $scope.regfail += "You ignored the password mismatch";
            }

            //If all the fields are entered then send the object to Service to add
            if (unenteredFields.length == 0 && pass == verifypass) {
                $scope.regfail = '';
                LoginService.add(user, function (res) {
                    console.log("Error forwared to Router js");

                    //Set any errors sent from service to the regfail
                    if (res == 'uname_exists') {
                        $scope.regfail = "Username already exists..Try other one!";

                    } else {
                        $scope.regfail = res;
                    }
                });
            }
        };
    }
});

app.controller("ContainerController", function ($scope, LoginService, $location) {
    $scope.$watch(
        function () {
            return LoginService.getCurrentUser();
        },
       function (currentUser) {
           $scope.currentUser = currentUser;
           if (currentUser != null) {
               if (currentUser.usertype == 'driver') {
                   $scope.isDriver = true;
               } else {
                   $scope.isDriver = null;
               }
           }
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