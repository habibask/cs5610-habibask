var app = angular.module("BookApp", []);

app.controller("BookController", function ($scope, $http) {

    $http.get("/booksonserver")
        .success(function (response) {
            console.log("books retrieved");
            console.log(response);

            $scope.booksarray = response;
            return $scope.booksarray;
        }
        );

    $scope.searchBooks = function () {

        var title = $scope.searchByTitle;
        console.log("inside search js");
        /* $.ajax({
             async: false,
             url: "/getbookcontent/" + title,
             success: function (response) {
                 console.log(response);
                 $scope.booksarray = response.items;
                 return $scope.booksarray;
             }
         });*/
        $http.get("/getbookcontent/" + title)
        .success(function (response) {
            console.log(response);
            $scope.booksarray = response.items;
            return $scope.booksarray;
        }
        );
    };

    $scope.addsearchtoserver = function (booksarray) {
        console.log("adding to server inside client")
        console.log(booksarray);
        $http.post("/addsearchtoserver", booksarray).
        success(function (response) {
            console.log("added to server")
            console.log(response);
            $scope.booksarray = response;

        });
    };

    $scope.addBook = function (book) {
        console.log("adding single book to server inside client")
        console.log(book);
        $http.post("/addbooktoserver/" , book).
        success(function (response) {
            console.log("added to server")
            $scope.booksarray = response;

        });
    };

    $scope.removeBook = function (index) {
        console.log("deleting from server inside client")
        console.log(index);
        $http.delete("/deletefromserver/" + index).
        success(function (response) {
            console.log("deleted to server")
            $scope.booksarray = response;

        });
    };

    $scope.selectBook = function (index) {
        console.log("inside selectbook");
        $scope.book = $scope.booksarray[index];
        $scope.index = index;
    }

    $scope.index = null;

    $scope.updateBook = function (book) {
        console.log("updating in server inside client")
        console.log(book);
        $http.put("/updateinserver/"+ $scope.index, book).
        success(function (response) {
            console.log("updated to server")
            $scope.book = null;
            $scope.booksarray = response;

        });
    };

});