var express = require('express');
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
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
app.use(session({
    secret: process.env.SESSION_SECRET || 'I am Habiba and this is a secret',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var connectionstring = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
mongoose.connect(connectionstring);

app.use(express.static(__dirname + '/files'));

var LoginDBSchema = new mongoose.Schema({
    username: { type: String },//,unique: true },
    password: { type: String },
    usertype: { type: String },
    name: { type: String },
    email: { type: String },
    carnumber: { type: String },
    carmodel: { type: String },
    carcapacity: { type: Number },
    authorized: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    personalmessage: { type: String }
}, { collection: 'UserInfoDBModel' });

//RoutesModel for the rides information

var RoutesDBSchema = new mongoose.Schema({
    username: { type: String },//,unique: true },
    source: { type: String },
    destination: { type: String },
    personcount: { type: String },
    proximity: { type: Number },
    cost: { type: Number },
    created: { type: Date, default: Date.now },
}, { collection: 'RoutesModel' });

//LoginDBSchema.plugin(uniqueValidator);

var LoginDBModel = mongoose.model("LoginDBModel", LoginDBSchema);
//var UserInfoDBModel = mongoose.model("UserInfoDBModel", UserInfoDBSchema);
var RoutesModel = mongoose.model("RoutesModel", RoutesDBSchema);

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("****************TRYING TO LOGIN*********************");
        LoginDBModel.findOne({ username: username, password: password }, function (err, user) {
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

app.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    LoginDBModel.findOne({ username: user.username }, function (err, data) {
        console.log("****************User Info found*********************");
        if (data) {
            res.json(data);
        }
    });
});

app.post("/register", function (req, res) {
    console.log("****************TRYING TO REGISTER*********************");

    console.log(req.body);
    var user = req.body;

    LoginDBModel.find({ username: user.username }, function (err, data) {
        if (data.length == 0) {
            console.log("Username does not exist");
            LoginDBModel.find({ email: user.email }, function (err, data) {
                if (data.length != 0) {
                    res.send("Email already registered");
                } else {
                    if (user.address2 == null) {
                        address2 = ' ';
                    } else {
                        address2 = user.address2;
                    }
                    if (user.personalmessage == null) {
                        personalmessage = ' ';
                    } else {
                        personalmessage = user.personalmessage;
                    }

                    if (user.usertype == 'driver') {

                        var newUserInfo = new LoginDBModel(
                            {
                                username: user.username, password: user.password, usertype: user.usertype,
                                name: user.name, email: user.email,
                                carnumber: user.carnumber, carmodel: user.carmodel, carcapacity: user.carcapacity, authorized: user.authorized,
                                address1: user.address1, address2: address2, city: user.city, state: user.state, personalmessage: personalmessage
                            });
                    } else {
                        var newUserInfo = new LoginDBModel(
                            {
                                username: user.username, password: user.password, usertype: user.usertype,
                                name: user.name, email: user.email,
                                carnumber: ' ', carmodel: ' ', carcapacity: ' ', authorized: ' ',
                                address1: user.address1, address2: address2, city: user.city, state: user.state, personalmessage: personalmessage
                            });

                    }
                    newUserInfo.save(function (err, userlocal) {
                        if (err == null) {
                            console.log("Data entered in LoginDBModel");
                            res.send("success");

                        } else {
                            console.log(err);
                            console.log("Error in UserInfoDB insert");
                            res.send("Server Problem: Error inserting information");
                        }
                    });


                }
            });

        } else {
            console.log("Username already exists");
            res.send("uname_exists");

        }
    });
});

app.put('/update/:currentusername', function (req, res) {

    console.log('*************************update information in server***********************');

    var username = req.params.currentusername;

    var user = req.body;
    console.log('username change from  - ' + username + '  to  - ' + user.username);

    if (user.address2 == null) {
        address2 = ' ';
    } else {
        address2 = user.address2;
    }
    if (user.personalmessage == null) {
        personalmessage = ' ';
    } else {
        personalmessage = user.personalmessage;
    }
    LoginDBModel.findOneAndUpdate({ 'username': username },
            {
                $set:
                   {
                       username: user.username,
                       usertype: user.usertype,
                       name: user.name,
                       email: user.email,
                       carnumber: (user.usertype == 'driver') ? user.carnumber : ' ',
                       carmodel: (user.usertype == 'driver') ? user.carmodel : ' ',
                       carcapacity: (user.usertype == 'driver') ? user.carcapacity : ' ',
                       address1: user.address1,
                       address2: address2,
                       city: user.city,
                       state: user.state,
                       personalmessage: personalmessage
                   }
            }, function (err, res) {
                console.log("User info updated");
                console.log(res);
            });
    LoginDBModel.find({ username: user.username }, function (err, data) {
        //console.log(data);
        res.send(data);
    });

});

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


/// Ride methods here

app.post("/addride/:username", function (req, res) {
    console.log("****************TRYING TO add a new ride*********************");

    console.log(req.body);
    var ride = req.body;

    var newRide = new RoutesModel({
        username: req.params.username,
        source: ride.source,
        destination: ride.destination,
        personcount: ride.personcount,
        proximity: ride.proximity,
        cost: ride.cost
    });
    newRide.save(function (err, ridelocal) {
        if (err == null) {
            console.log("Data entered in RoutesModel");
            res.send("success");

        } else {
            console.log(err);
            console.log("Error in RoutesModel insert");
            res.send("Server Problem: Error inserting information");
        }
    });
});

app.post('/getrides/:username', function (req, res) {
    var username = req.params.username;
    RoutesModel.find({ username: username }, function (err, data) {
        if (data) {
            console.log("****************Rides for the user found*********************");
            res.json(data);
        }
    });
});

app.post('/getrides', function (req, res) {
    var username = req.params.username;
    RoutesModel.find(function (err, data) {
        if (data) {
            console.log("****************All the Rides requested*********************");
            res.json(data);
        }
    });
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/files/homepage.html');

});

//app.listen(3000);
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ip, function () {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), ip, port)
});



/////CRAP

//WIKI API call for JSON data

/*app.get('/getwikidata/:query', function (req, res) {
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
});*/
