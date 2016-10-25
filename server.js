var express = require('express');
var strftime = require('strftime');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send("hello!")
});

app.get('/:time', function (req, res) {

	var time = req.params.time;

	if(/^\d+$/.test(time)){

		var date = new Date(time * 1000);
		//console.log((time * 1000) + (date.getTimezoneOffset() * 60 * 1000));

		return res.json({unix: parseInt(time), natural: strftime('%B %e, %Y', new Date((time * 1000) + (date.getTimezoneOffset() * 60 * 1000)))});
	
	} else if (new Date(time) !== 'Invalid Date') {

		time = new Date(time);

		return res.json({unix: (Date.parse(time) - (time.getTimezoneOffset() * 60 * 1000)) / 1000, natural: strftime('%B %e, %Y', time)});
	
	} else 

	return res.json({unix: null, natural: null});
});

app.listen(port);
console.log("listening on port " + port);