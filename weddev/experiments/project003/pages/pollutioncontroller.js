app.controller("pollutionController", function ($scope, $http, $location) {

    console.log("Inside angular pollution script before request");
    var text="";
    $http.get("/getwikidata/air pollution")
        .success(function (data) {
        console.log("Inside angular pollution script response ");
        console.log(data);
       // $scope.pollution = data.query.pages[10934212].revisions[0]['*']; 
            console.log(data.warnings);
            for (var pageId in data.query.pages) {
                if (data.query.pages.hasOwnProperty(pageId)) {
                    var num_revisions = data.query.pages[pageId].revisions.length;
                    var i;
                    for (i = 0 ; i < num_revisions ; i++) {
                        $scope.pollution += data.query.pages[pageId].revisions[i]['*'];
                    }
                }
            }
           
        });

});