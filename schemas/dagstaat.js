// define our lobby schema for mongoose
var mongoose = require('mongoose');

var dagstaatSchema = mongoose.Schema({
	name		: String,
	date		: Date,
	start		: Number,
	extra		: Number,
	turnover	: Number,
	tab			: Number,
	tabPaid		: Number,
	out			: Number,
	pin			: Number,
	counted		: Number,
	envelope	: Number,
});

module.exports = mongoose.model('Dagstaat', dagstaatSchema);
