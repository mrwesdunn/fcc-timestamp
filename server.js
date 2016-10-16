var express = require('express');
var strftime = require('strftime');
var port = process.env.PORT || 8080;

var app = express();

app.get('/', function(req, res) {
	res.send("hello!")
});

app.listen(port);
console.log("listening on port " + port);