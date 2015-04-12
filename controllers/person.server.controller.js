var Person = require('../models/person.server.model.js');

exports.createPerson = function(req,res) {
	var entry = new Person({
		name: req.body.name
	});
	entry.save();

	res.send(entry);
};

exports.getPersons = function(req,res) {
	Person.find(function(err,persons) {
		if(err)
			res.send(err);
		res.send(persons);
	});
};

exports.getPerson = function(req,res) {
	Person.findOne(function(err,person) {
		
	});
}