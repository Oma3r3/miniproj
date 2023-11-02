require('dotenv').config();

var express = require('express');
var mysql = require('mysql');

var con = require('./database');

var app = express();
var bp = require('body-parser');

con.connect(function(error) {
    if (error) throw error;
})



app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set("view engine", "hbs");


app.get('/', function(req, res) {
    res.render("homepage");
});

app.get('/reservations', function(req, res) {
    res.render("reservations");
})

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/loginpage.html');
})

app.get('/homepage', function(req, res) {
    res.render("homepage");
})

// app.post('/signup', function(req, res) {
//     var username = req.body.username;
//     var password = req.body.password;
//     const query = 'INSERT INTO users values (?, ?);';
//     const querya = 'SELECT * FROM users where username = ?;';
//     con.query(querya, [username], function(error, data, fields) {
//             if (error) throw error;
//             if (data.length > 0) {
//                 res.send("<h1> USER ALREADY EXISTS </h1>");
//             } else {
//                 con.query(query, [username, password], function(error, results) {
//                     if (error) throw error;
//                     res.send('inserted the data successfuly');
//                 })
//             }
//         })
//         // con.query(query, [username, password], function(error, results) {
//         //     if (error) throw error;
//         //     res.send('inserted the data successfuly');
//         // })


// })

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    squery = 'SELECT * from users where username = ? and password = ?;';
    fquery = 'SELECT position from users where username = ?;';
    con.query(squery, [username, password], function(error, data, fields) {
        if (error) throw error;
        if (data.length > 0) {
            console.log('matching data found');
            con.query(fquery, [username], function(error, data, fields) {
                if (error) throw error;
                var rslt = JSON.parse(JSON.stringify(data));
                if (rslt[0].position == 'faculty') {
                    res.render("homepage", { prompt: "YOU HAVE LOGGED IN SUCCESFULLY AS FACULTY", });
                } else {
                    res.render("homepage", { prompt: "YOU HAVE LOGGED IN SUCCESFULLY AS CLUB ADMIN", })
                }
                console.log(rslt[0].position);
            })
        } else {
            res.send("<p>WRONG PASSWORD! TRY AGAIN </p>");
        }
    })

})

// const avllist = ["class19", "class20", "class21", "class22"]; 

app.post('/reservations', function(req, res) {
    var date = req.body.dateofbirth;
    q = 'SELECT * FROM reservations WHERE mdate = ?';
    con.query(q, [date], function(error, data, fields) {
            if (error) throw error;
            if (data.length > 0) {
                res.render("reservations", {
                    vrb: "",
                })
            } else {
                res.render("reservations");
            }
        })
        // res.sendFile(__dirname + '/homepage.html');
})

// PORT = process.env.port;

app.listen(3000, function() {
    console.log("app listening on port 3000 h");
});