$(function () {
    $("#search").click(function () {

        var word = $("#inputquery").val();
        $.ajax({
            url: "http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
            success: renderData
        });
    });
});
function renderData(array) {
    var ul = $(".data");
    ul.empty();
    console.log(array.length);
    if (array.length != 0) {
        for (var i in array) {
            var data = array[i];
            var mean = data.text;
            var pos = data.partOfSpeech;
            var li = $("<li class='list-group-item-success'><span class='badge' style='margin:3px'>" + pos + "</span>" + mean + "</li>");
            ul.append(li);
        }
    }
    else {
        var li = $("<li class='list-group-item-danger'><span class='badge' style='margin:3px'>Note</span>There is no definition in the dictionary</li>");
        ul.append(li);
    }
};