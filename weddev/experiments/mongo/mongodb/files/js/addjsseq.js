var app = angular.module("EmployeeApp", []);

app.controller("EmployeeController", function ($scope, $http) {
    var employees = [];

    $http.get("/getSeqinfo/")
        .success(function (response) {
            console.log("employees retrieved in seq");
            console.log(response);

            $scope.employees = response;
            employees = response;
            return $scope.employees;
        }
        );

    $scope.addEmployeeSequence = function (employee) {
        console.log("inside add employee Sequence");
        console.log(employee);

        $http.post("/addEmployeeSequence/", employee).
        success(function (response) {
            if (response == 'Error') {
                $scope.error = "First name cannot be blank";
                return;
            };
            employees.push(employee);
            console.log("added to server")
            $scope.employees = response;
            console.log("pushed new employee");
            $scope.employee = null;

        });
    }
});