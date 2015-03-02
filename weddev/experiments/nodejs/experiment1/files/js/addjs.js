var app = angular.module("BookApp", []);

function pushBooks($scope, response) {
    $scope.booksarray = response.items;
    return $scope.booksarray;
}

app.controller("BookController", function ($scope, $http) {

    $scope.searchBooks = function () {
        
        var title = $scope.searchByTitle;
        console.log("inside search js");
        $.ajax({
            async: false,
            url: "/getbookcontent/" + title,
            success: function (response) {
                console.log(response);
                pushBooks($scope, response);
            }
        });
    };

    $scope.addBook = function () {
        console.log("inside addbook");
        var newvolumeInfo = {
            title: $scope.book.volumeInfo.title,
            averageRating: $scope.book.volumeInfo.averageRating,
            authors: $scope.book.volumeInfo.authors,
            description: $scope.book.volumeInfo.description
        };
        var newBook = {
            volumeInfo: newvolumeInfo
        }
        console.log(newBook);
        $scope.booksarray.push(newBook);
    }

    $scope.removeBook = function (book) {
        var index = $scope.books.indexOf(book);
        $scope.books.splice(index, 1);
    }

    $scope.selectBook = function (book) {
        $scope.book = book;
    }

    $scope.updateBook = function () {
        alert($scope.book.title);
    }
});