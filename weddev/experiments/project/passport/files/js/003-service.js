app.factory('LoginService', function LoginService($http,$location) {

    var currentUser = null;

    var getCurrentUser = function () {
        return currentUser;
    };

    var checkInfo = function (user,callback) {

        $http.post("/login", user)
        .success(function (response) {
            console.log("service current user " + response);
            currentUser = response;
            console.log(currentUser);

            ($location.url("/profile"));
        });
    };

    var addInfo = function (user) {
        console.log(user);
        $http.post("/register", user)
        .success(function (res) {
            console.log("inside Service add" + res.username);
            console.log( res);
            checkInfo(res);
        });
    };

   var logout = function () {
        currentUser = null;
        $http.post("/logout", currentUser)
        .success(function (res) {
            $location.url("/login");
        });
    };
    return {
        login: checkInfo,
        add:addInfo,
        getCurrentUser: getCurrentUser,
        logout: logout
    }
    
 });