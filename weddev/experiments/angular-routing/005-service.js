app.factory('WordService', function WordService($http) {

    var urlArray = [];


    var addurl = function (url) {
        urlArray.push(url);
        console.log(urlArray);
    };

    return {
        addurl: addurl,
        urlArray: urlArray
    }
    
 });