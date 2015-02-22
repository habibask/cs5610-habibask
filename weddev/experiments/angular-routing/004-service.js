app.factory('WordService', function WordService($http) {

    var wordHistory = [];


    var searchWord = function (word,callback) {
        $http.jsonp("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&callback=JSON_CALLBACK")
            .success(function (response) {
                wordHistory.push(word);
                console.log(wordHistory);
                callback(response);
            });
    };

    return {
        search: searchWord,
        wordHistory: wordHistory
    }
    
 });