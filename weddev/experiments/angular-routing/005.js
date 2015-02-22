
var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/home4.html',
              controller: 'homeController'
          }).
        when('/gallery', {
            templateUrl: 'pages/gallery.html',
            controller: 'galleryController'

        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


app.controller("galleryController", function ($scope, WordService) {
    $scope.urls = WordService.urlArray;

    $(".home").click(function () {
        $(".home").addClass("active");
        $(".gallery").removeClass("active");
    });
    $(".gallery").click(function () {
        $(".gallery").addClass("active");
        $(".home").removeClass("active");
    });
});


app.controller("homeController", function ($scope, WordService) {

    $scope.addUrl = function () {
        var url = $scope.inputurl;
        WordService.addurl(url);
    };

    $(".home").click(function () {
        $(".home").addClass("active");
        $(".gallery").removeClass("active");
    });
    $(".gallery").click(function () {
        $(".gallery").addClass("active");
        $(".home").removeClass("active");
    });

});
