var app = angular.module("EmployeeApp", []);

app.controller("EmployeeController", function ($scope, $http) {
    var employees = [];

    $http.get("/getinfo/")
        .success(function (response) {
            console.log("employees retrieved");
            console.log(response);

            $scope.employees = response;
            employees = response;
            return $scope.employees;
        }
        );

    $scope.addEmployee = function (employee) {
        console.log("inside add employee");
        console.log(employee);

        $http.post("/addEmployee/", employee).
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
            $scope.employees = employees;
            console.log("pushed new employee");
            $scope.employee = null;

        });
    }

    $scope.removeEmployee = function (id) {
        console.log("deleting from database")
        console.log( id);
        $http.delete("/deleteEmployee/"+id).
        success(function (response) {
            console.log("deleted to server")
            $scope.employees = response;

        });
    };

    $scope.selectEmployee = function (employee) {
        console.log("selecting the employee")
        $scope.employee = employee;
    };

    $scope.updateEmployee = function (employee) {
        console.log("updating the database")
        console.log(employee._id);
        $http.put("/updateEmployee/",employee).
        success(function (response) {
            console.log("updated to server")
            $scope.employees = response;

        });
    };

    $scope.searchEmployees = function () {

        var title = $scope.searchByTitle;
        console.log("inside search js");
        $http.get("/findEmployee/" + title)
        .success(function (response) {
            console.log(response);
            $scope.employees = response;
            return $scope.employees;
        }
        );
    };
});