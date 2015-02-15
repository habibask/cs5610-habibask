var app = angular.module("ActorsApp", []);

function myapifilms(response) {
    alert(response);
}

app.controller("ActorsAppController", function ($scope, $http) {

   
    $scope.searchActor = function () {
        var name = $scope.searchByName;
        $http.jsonp("http://www.myapifilms.com/imdb?name="+name+"&format=JSONP&filmography=0&limit=10&lang=en-us&exactFilter=0&bornDied=0&starSign=0&uniqueName=0&actorActress=1&actorTrivia=0&actorPhotos=N&actorVideos=N&salary=0&spouses=0&tradeMark=0&personalQuotes=0&callback=JSON_CALLBACK")
            .success(function (response) {
                console.log(response);
            $scope.actors = response;
        });
    }
});