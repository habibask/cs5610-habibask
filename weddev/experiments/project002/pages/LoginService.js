app.factory('LoginService', function LoginService($http,$location) {

    var currentUser = null;
    var loginfail = null;
    var getCurrentUser = function () {
        return currentUser;
    };
    var getloginfail = function () {
        return loginfail;
    };

    var checkInfo = function (user,callback) {
        loginfail = null;

        $http.post("/login", user)
        .success(function (response) {
            console.log("service current user " + response);
            currentUser = response;
            console.log(currentUser);
            ($location.url("/profile"));
        })
        .error(function (response) {
            console.log("service current user failed" + response);
            currentUser = null;
            loginfail = true;
            callback();
        });
    };

    var addInfo = function (user,callback) {
        console.log(user);
        $http.post("/register", user)
        .success(function (res) {
            if (res == user) {
                console.log("inside Service add" + res.username);
                console.log(res);
                checkInfo(res);
            } else {
                callback(res);
            }
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
        logout: logout,
        getloginfail: getloginfail
    }
    
 });