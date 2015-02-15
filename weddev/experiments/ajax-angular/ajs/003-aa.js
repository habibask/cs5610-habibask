var app = angular.module("EducationApp", []);
app.controller("EducationAppController",
function ($scope, $http) {
    var erows = [
    {
        uni: "Hyderabad Public School",
        degree: "High School",
        major: "maths",
        year: "2005"
    }
    ];
    $scope.erows = erows;
    $scope.addRow = function () {
        var newRow = {
            uni: $scope.erow.uni,
            degree: $scope.erow.degree,
            major: $scope.erow.major,
            year: $scope.erow.year
        };
        $scope.erows.push(newRow);
    }
    $scope.editRow = function (erow) {
        $scope.erow = erow;
    }

    $scope.updateRow = function () {
        $scope.erow = "";
    }
});

