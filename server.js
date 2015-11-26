/*
 * Dagstaatje server
 *
 * TODO save the urls we're listening to, to a seperate file for readability
 *
 */

var express = require('express');
var mongoose = require('mongoose');

var app = express();
var PORT_NUMBER = process.argv[2]; // to start: "node server.js [port]"

// connect to the database
mongoose.connect('mongodb://localhost/dagstaatje-database');
var Dagstaat = require('./schemas/dagstaat');

app.post('/newEntry/:date/:start/:extra/:turnover/:tab/:tabPaid/:out/:pin/:counted/:envelope',
		function respondAndSave(req, res) {
	getAmountOfShiftsToday(req.params.date, function(amountOfShifts) {
		var dagstaat = new Dagstaat({
			date		: req.params.date,
			shift		: amountOfShifts,
			start		: req.params.start,
			extra		: req.params.extra,
			turnover	: req.params.turnover,
			tab			: req.params.tab,
			tabPaid		: req.params.tabPaid,
			out			: req.params.out,
			pin			: req.params.pin,
			counted		: req.params.counted,
			envelope	: req.params.envelope
		});
		dagstaat.save(function(err, dagstaat) {
			if (err) {
				res.send("There was an error saving to the database");
			}
			console.log('Dagstaat added to db:');
			console.log(dagstaat);
			res.send('Saved to database');
		});
	});
});

app.get('/getData/:date', function respondWithRequestedDate(req, res) {
	console.log(req.params.date);
	Dagstaat.find({date : req.params.date}, function(err , dagstaatjes) {
		if(err) {
			res.send(err);
		} else {
			res.send(dagstaatjes);
		}
	});
});

function getAmountOfShiftsToday(mDate, callback) {
	Dagstaat.find({date : mDate}, function(err, dagstaatjes) {
		if(err) {
			console.log(err);
		} else {
			callback(dagstaatjes.length);
		}
	});
}

// start the server
var server = app.listen(PORT_NUMBER, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at %s:%s', host, port);
});
