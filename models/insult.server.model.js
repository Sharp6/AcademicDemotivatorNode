var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insultSchema = new Schema({
	insultString: String,
	type: String,
	person: String
});

module.exports = mongoose.model('Insult', insultSchema);