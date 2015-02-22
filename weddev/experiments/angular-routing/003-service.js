app.factory('LoginService', function LoginService($http) {

    var loginArray = [{
        Name:"habiba",
        username: "x",
        password: "x",
        message: "hello"}];
    
    var checkInfo = function (username,password,callback) {

        console.log(loginArray);
        console.log(username);
        console.log(password);

        for(var value in loginArray) {
            var obj = loginArray[value];
            uname = obj.username;
            passwd = obj.password;
            if (uname == username && passwd == password) {
                callback(obj.username, obj.message);
            } else {
                callback("Visitor", "Username and password do not match. You need to sign up in Register tab if not already registered.");

            }
        }
    };

    var addInfo = function (newLogin) {

        loginArray.push(newLogin);
        console.log(loginArray);
    };

    return {
        login: checkInfo,
        add:addInfo
    }
    
 });