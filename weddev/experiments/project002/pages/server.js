var express = require('express');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var request = require('request');
var multer = require('multer')
var bodyparser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: 'I am Habiba and this is a secret' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var connectionstring = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
mongoose.connect(connectionstring);

app.use(express.static(__dirname + '/files'));

var LoginDBSchema = new mongoose.Schema({
    username:  { type: String, required: true, unique: true },
    password:  { type: String, required: true},
    usertype: { type: String, required: true },
}, { collection: 'LoginDBModel' });

var UserInfoDBSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    Name:  { type: String, required: true},
    email:  { type: String, required: true, unique: true },
    carnumber:  { type: String},
    carmodel: { type: String },
    capacity: { type: Number },
    authorized: { type: String },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
}, { collection: 'UserInfoDBModel' });

LoginDBSchema.plugin(uniqueValidator);
UserInfoDBSchema.plugin(uniqueValidator);

var LoginDBModel = mongoose.model("LoginDBModel", LoginDBSchema);
var UserInfoDBModel = mongoose.model("UserInfoDBModel", UserInfoDBSchema);

passport.use(new LocalStrategy(
    function (username, password, done) {
      LoginDBModel.findOne({ username: username, password: password}, function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Unable to login' });
            }
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
var auth = function (req, res, next) {
    if (!(req.isAuthenticated())) {
        res.send(401);
    } else {
        next();
    }
};

app.post('/login',passport.authenticate('local'), function (req, res) {
    var user = req.user;
    res.json(user);
});

app.post("/register", function (req, res) {
    console.log(req.body);
    var user = req.body;
    var newUser = new LoginDBModel({ 'username': user.username, 'password': user.password, 'usertype':user.usertype });
    newUser.save(function (err) {
        console.log(err);
        console.log(user);

        if (err == null) {
            var newUserInfo = new UserInfoDBModel({
                username: user.username, Name: user.name, email: user.email,
                carnumber: user.carnumber, carmodel: user.carmodel, capacity: user.carcapacity, authorized: user.authorized,
                address1: user.address1, address2: user.address2, city: user.city, state: user.state
            });
            newUserInfo.save(function (err, user) {
                console.log(err);
                if (err == null) {

                    UserInfoDBModel.find({ username: req.body.username }, function (err, data) {
                        console.log(data);
                    });
                    LoginDBModel.find({ username: req.body.username }, function (err, data) {
                        console.log(data);
                        res.json(data[0]);
                    });
                } else {
                    console.log(err.errors[0]);
                    res.send(err);
                }

            });
        } else {
            console.log("Error in LoginDB insert");
            console.log(err.errors[0]);
            res.send(err)
        }
    });
   
    
});


//WIKI API call for JSON data

app.get('/getwikidata/:query', function (req, res) {
    console.log("inside getwikidata");

    var title = req.params.query;
    console.log(title);

    request('http://en.wikipedia.org/w/api.php?format=json&action=query&titles=air%20pollution&prop=revisions&rvprop=content',
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
         //   console.log(body);
           var info = JSON.parse(body);
            res.send(info);
        }
    })
});
//


app.get('/loginapp', function (req, res) {
    res.sendfile(__dirname + '/files/homepage.html');

});

app.get('/rest/user', auth, function (req, res) {
    res.json(PassportAuthenticationUser);
});

app.get("/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/logout", function (req, res) {
    req.session.destroy();
    res.send(200);
}); 


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/files/homepage.html');

});

//app.listen(3000);
var ip = process.env.OPENSHIFT_NODEJS_IP ||'127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ip, function () {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), ip, port)
});
