var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');

var app = express();

var bookonserver = [];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/files'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/files/index.html');
});

app.get("/search", function (req, res) {
    console.log("im hrere");
    console.log(__dirname + '/files/search.html');
    res.sendfile(__dirname + '/files/search.html');
});

app.get('/add', function (req, res) {
    res.sendfile(__dirname + '/files/add.html');

});

app.get('/update', function (req, res) {
    res.sendfile(__dirname + '/files/update.html');
});

app.get('/delete', function (req, res) {
    res.sendfile(__dirname + '/files/delete.html');
});

app.get('/booksonserver', function (req, res) {
    console.log("inside booksonserver");
    res.send(bookonserver);
});

app.get('/getbookcontent/:data', function (req, res) {
    console.log("inside getcontent");

    var title = req.params.data;
    request('https://www.googleapis.com/books/v1/volumes?q=' + title,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            //  bookonserver = info.items;
            res.send(info);
        }
    })
});

app.post('/addsearchtoserver', function (req, res) {
    console.log("inside addtoserver");
    var books = req.body;
    for (var i = 0; i < books.length; i++) {
        bookonserver.push(books[i]);
    }
    console.log(bookonserver);
    res.send(bookonserver);
});

app.post('/addbooktoserver', function (req, res) {
    console.log("inside addtoserver");
    var book = req.body;
    bookonserver.push(book);
    res.send(bookonserver);
});

app.delete('/deletefromserver/:index', function (req, res) {
    console.log("inside deletefromserver");
    var index = req.params.index;

    bookonserver.splice(index, 1)
    res.send(bookonserver);

});

app.put('/updateinserver/:index', function (req, res) {
    console.log("inside updateinserver");
    var book = req.body;
    var index = req.params.index;
    bookonserver[index] = book;
    res.send(bookonserver);

});

//app.listen(3000);
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ip, function () {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), ip,port)
});