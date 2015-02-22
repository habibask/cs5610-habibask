
var app = angular.module("FirstRoutingApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'pages/home3.html',
              controller: 'homeController'
          }).
        when('/history', {
            templateUrl: 'pages/history.html',
            controller: 'historyController'

        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


app.controller("historyController", function ($scope, WordService) {
    $scope.wordHistory = WordService.wordHistory;


    $(".history").click(function () {
        $(".history").addClass("active");
        $(".home").removeClass("active");

    });

    $(".home").click(function () {
        $(".home").addClass("active");
        $(".history").removeClass("active");
    });

});


app.controller("homeController", function ($scope, WordService) {

    $scope.searchWord = function () {
        var word = $scope.inputquery;
        $scope.wordHistory = [];
        WordService.search(word, function (response) {
            if (response.length != 0) {

                $scope.meanings = response;
                console.log($scope.wordHistory);
            } else {
                var meanings = [{ text: 'There is no definition in the dictionary', partOfSpeech: 'Note' }];
                $scope.meanings = meanings;
            }
        })
    };


    $(".home").click(function () {
        $(".home").addClass("active");
        $(".history").removeClass("active");
    });


    $(".history").click(function () {
        $(".history").addClass("active");
        $(".home").removeClass("active");

    });
});
