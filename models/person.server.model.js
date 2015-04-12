var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
	name: String,
	topics: [ String ],
	papers: [ String ],
	phdtitle: String, 
	salt: String,
	passwordHash: String
});

module.exports = mongoose.model('Person', personSchema);