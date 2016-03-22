/*
Indrawan Saputra (indrawan@csu.fullerton.edu) & Sha Lu (sha.lu@csu.fullerton.edu)
CPSC 473-01 Assignment 5
3/22/2016
*/
var express = require("express"),
    http = require("http"),
    app;

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})


// Express powered HTTP server
app = express();
http.createServer(app).listen(3000);

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var $wins = 0;
var $losses = 0;

app.get("/index.html", function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

// setting up route
app.get("/hello", function(req, res) {
    res.send("hello world!");
});

app.post("/flip", urlencodedParser, function(req, res) {
    var coin = ["heads", "tails"];

    var randomNum = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    console.log(randomNum);
    console.log(req.body);
    console.log(req.body["call"]);

    if (req.body["call"] == coin[randomNum]) {
        $wins++;
        console.log("Matched - you win");
        response = {
            "result": "win"
        };
        console.log(response);
        res.json(response);
    } else {
        $losses++;
        console.log("It doesn't match - you loss");
        response = {
            "result": "loss"
        };
        console.log(response);
        res.json(response);
    }
});

app.get("/stats", function(req, res) {
    response = {
        "wins": $wins,
        "losses": $losses
    };
    res.send(response);
});