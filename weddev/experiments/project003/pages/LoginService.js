app.factory('LoginService', function LoginService($http,$location) {

    var currentUser = null;
    var currentusername = null;
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
            console.log(response);
            currentusername = response.username;
            ($location.url("/profile"));
        })
        .error(function (response) {
            console.log("service current user failed" + response);
            currentUser = null;
            loginfail = true;
            callback();
        });
    };

    var addInfo = function (user, callback) {
        console.log("Inside Register Service");
        console.log(user);
        $http.post("/register", user)
        .success(function (res) {
            if (res == "success") {
                console.log("inside Service add" + res.username);
                console.log(res);
                checkInfo(user);
            } else {
                callback(res);
            }
        });
    };

    var update = function (user, callback) {
        console.log("Inside Update Service");
        console.log(user);
        console.log(currentusername);
        $http.put("/update/"+currentusername, user)
        .success(function (res) {
            if (res == "success") {
                console.log("inside Service add" + res.username);
                console.log(res);
                checkInfo(user);
                callback(res);
            }
        });
    };

    var getInfo = function (user, callback) {
        console.log("Inside getInfo Service");
        console.log(user);
        $http.post("/userinfo", user)
        .success(function (res) {
            if (res == "error") {
                callback(res);
            } else {
                console.log("inside Service getinfo" + res.username);
                console.log(res);
                checkInfo(user);
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


    //Ride functionality
   var addRide = function (ride, callback) {
       console.log("Inside Register Service of Addride");
       console.log(ride);
       $http.post("/addride/"+currentUser.username, ride)
       .success(function (res) {
           if (res == "success") {
               console.log("Inside Service add return - " + res.source);
               console.log(ride);
               $location.url("/profile");
           } else {
               callback(res);
           }
       });
   };

   var getRides = function (callback) {
       $http.post("/getrides/"+currentUser.username)
       .success(function (response) {
           console.log("Received rides info for the user " + response);
           console.log(response);
           callback(response);
       })
   }

   var searchRides = function (callback) {
       $http.post("/getrides")
       .success(function (response) {
           console.log("Received rides info" + response);
           console.log(response);
           callback(response);
       })
   }

    return {
        login: checkInfo,
        add:addInfo,
        getCurrentUser: getCurrentUser,
        logout: logout,
        getloginfail: getloginfail,
        update: update,
        addRide: addRide,
        getRides: getRides,
        searchRides:searchRides
    }
    
 });