var app = angular.module("OrderForm", []);

app.controller("OrderFormController", function ($scope, $http) {

    var courses = [
		{
		    name: 'Web Development',
		    price: 5000,
		    active: true
		}, {
		    name: 'Algorithms',
		    price: 4000,
		    active: true
		}, {
		    name: 'Data Mining',
		    price: 7000,
		    active: false
		}, {
		    name: 'Co-Op',
		    price: 0,
		    active: false
		}
    ];
    $scope.courses = courses;

    $scope.toggleActive = function (s) {
        s.active = !s.active;
    };


    $scope.total = function () {
        var total = 0;

        angular.forEach($scope.courses, function (s) {
            if (s.active) {
                total += s.price;
            }
        });

        return total;
    };
});