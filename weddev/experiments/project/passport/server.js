var express = require('express');
var mongoose = require('mongoose');
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
    username: String,
    password: String
}, { collection: 'LoginDBModel' });


var LoginDBModel = mongoose.model("LoginDBModel", LoginDBSchema);

passport.use(new LocalStrategy(
    function (username, password, done) {
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


app.post('/login',passport.authenticate('local'), function (req, res) {
    var user = req.user;
    res.json(user);
});

app.post("/register", function (req, res) {
    console.log(req.body);
    var newUser = new LoginDBModel({ 'username': req.body.username, 'password': req.body.password });
    newUser.save(function (err, user) {
        LoginDBModel.find({username:req.body.username},function (err, data) {
            console.log(data);
            res.json(data[0]);
        });
       
    });
});

app.get('/loginapp', function (req, res) {
    res.sendfile(__dirname + '/files/003.html');

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



//Employee experiment Code - Last week's experiment

var EmployeeSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    role: String
}, { collection: 'EmployeeModel' });


var EmployeeModel = mongoose.model("EmployeeModel", EmployeeSchema);

var SequenceSchema = new mongoose.Schema({
    id:Number,seq:Number}, { collection: 'SequenceModel' });


var SequenceModel = mongoose.model("SequenceModel", SequenceSchema);


var EmployeeSeqSchema = new mongoose.Schema({
    id: Number,
    fname: String,
    lname: String,
    role: String
}, { collection: 'EmployeeSeqModel' });


var EmployeeSeqModel = mongoose.model("EmployeeSeqModel", EmployeeSeqSchema);

app.post('/addEmployee', function (req, res) {

    if (req.body.fname == null) {
        res.send("Error");
        return;
    }
    var employee = new EmployeeModel({
        fname: req.body.fname,
        lname: req.body.lname,
        role: req.body.role
    });
    employee.save(function () {
        EmployeeModel.find(function (err, data) {
            res.json(data);
        });
    });

   

});

app.post('/addEmployeeSequence', function (req, res) {

    if (req.body.fname == null) {
        res.send("Error");
        return;
    }

    var seq;
    SequenceModel.findOneAndUpdate({ id: 123 },
    {
        $inc: {
            seq: 1
        }
    }, function (err, result) { console.log(result); });
    SequenceModel.find({ id: 123 }, function (err, data) {
        console.log("Sequence - "+data[0].seq);
        seq = data[0].seq;
        console.log("Sequence generated - " + seq);

        var employee = new EmployeeSeqModel({
            id: seq || 2,
            fname: req.body.fname,
            lname: req.body.lname,
            role: req.body.role
        });
        employee.save(function () {
            EmployeeSeqModel.find(function (err, data) {
                console.log(data);
                res.json(data);
            });
        });

        

    });

    

});



function getNextSequence() {
    

}

app.delete('/deleteEmployee/:id', function (req, res) {

    console.log(req.body);
    var idtodelete = req.params.id;

    console.log("Deleted id=" + idtodelete);
    EmployeeModel.remove({ _id: idtodelete }, function (err, count) {
        console.log('deleted - ' + count);
        EmployeeModel.find(function (err, data) {
            console.log(data);
            res.json(data);
        });
    });
   

});

app.put('/updateEmployee', function (req, res) {

    console.log(req.body);
    var idtodelete = req.body._id;
    console.log(mongoose.Types.ObjectId(idtodelete));
    idtodelete = mongoose.Types.ObjectId(idtodelete);
    console.log("Updated id=" + idtodelete);
    EmployeeModel.findOneAndUpdate({ _id: idtodelete },
    {$set: {fname: req.body.fname,
            lname: req.body.lname,
            role: req.body.role
        }
    }, function (err, result) { console.log(result);});
    EmployeeModel.find({ _id: idtodelete }, function (err, data) {
        console.log(data);
    });
});

app.get('/findEmployee/:word', function (req, res) {

    var searchWord = req.params.word;
    console.log(searchWord);
    var pattern = '.*'+searchWord+'.*'
    EmployeeModel.find( { fname : { $regex : searchWord } } ,  function (err, data) {
        res.json(data);
    });
});


app.get('/getSeqinfo', function (req, res) {

    var seq = new SequenceModel(
   {
       id: 123,
       seq: 1000
   }
);

    seq.save();

    EmployeeSeqModel.find(function (err, data) {
        res.json(data);
    });

});

app.get('/getinfo', function (req, res) {

    EmployeeModel.find(function (err, data) {
        res.json(data);
    });

});

app.get('/add', function (req, res) {
    res.sendfile(__dirname + '/files/add.html');

});

app.get('/addseq', function (req, res) {
    res.sendfile(__dirname + '/files/sequenceadd.html');

});

app.get('/delete', function (req, res) {
    res.sendfile(__dirname + '/files/delete.html');

});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/files/index.html');

});
app.get('/del', function (req, res) {
    res.sendfile(__dirname + '/files/dindex.html');

});

app.get('/upd', function (req, res) {
    res.sendfile(__dirname + '/files/uindex.html');

});

app.get('/update', function (req, res) {
    res.sendfile(__dirname + '/files/update.html');

});

app.get('/search', function (req, res) {
    res.sendfile(__dirname + '/files/searchemployee.html');

});
//Employee experiment Code

//app.listen(3000);
var ip = process.env.OPENSHIFT_NODEJS_IP ||'127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ip, function () {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), ip, port)
});
