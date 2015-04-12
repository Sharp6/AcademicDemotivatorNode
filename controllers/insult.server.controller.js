var Insult = require('../models/insult.server.model.js');
var Person = require('../models/person.server.model.js');

exports.createInsult = function(req,res) {
	var entry = new Insult({
		insultString: req.body.insultString,
		type: req.body.type,
		person: req.body.person
	});
	entry.save();
}

exports.getInsult = function(req,res) {
	Insult.findOne({
		type: 'generic'
	}, function(err,result) {
		if(err)
			res.send(err)
		res.send(result.insultString);
	});
};

exports.getInsults = function(req,res) {
	Insult.find(function(err,insults) {
		if(err)
			res.send(err);
		res.send(insults);
	});
};

exports.getInsultForPerson = function(req,res) {
	Person.findOne({
		name: req.params.person  
	}, 
	 function(err,person) {
		if(err)
			res.send(err);
		var insultType = selectInsultType(person);

		if(insultType === "person-specific") {
			var options = {
				type: "person-specific",
				person: person.name
			}
		} else {
			var options = {
				type: insultType
			}
		}

		Insult.find(options, function(err, insults) {
			if(err)
				res.send(err);

			var randomPosition = Math.floor(Math.random() * insults.length);
			var insult = insults[randomPosition];

			var insultString = insult.insultString;

			if(insultType === "topic-specific") {
				insultString = replaceTopic(insultString, person.topics[0]);
			}

			if(insultType === "phd-specific") {
				insultString = replacePhdtitle(insultString, person.phdtitle);	
			}
			
			if(insultType === "paper-specific") {
				insultString = replacePaper(insultString, person.papers[0]);	
			}
			
			res.send(insultString);
		});
	});
};

var replaceTopic = function(insult, topic) {
	return insult.replace(/_topic_/g, topic);
};

var replacePhdtitle = function(insult, phdtitle) {
	return insult.replace(/_phdtitle_/g, phdtitle);
}

var replacePaper = function(insult, papertitle) {
	return insult.replace(/_papertitle_/g, papertitle);
}

var selectInsultType = function(person) {
	var types = ["generic","topic-specific","phd-specific","person-specific","paper-specific"];
	var randomPosition = Math.floor(Math.random() * types.length);
	console.log(randomPosition);

	if(types[randomPosition] === "topic-specific") {
		// Person should have at least one topic
		if(!person.topics[0]) {
			return selectInsultType(person);
		} else {
			return "topic-specific";
		}
	}

	if(types[randomPosition] === "phd-specific") {
		// Person should have a PhD title
		if(!person.phdtitle) {
			return selectInsultType(person);
		} else {
			return "phd-specific";
		}
	}

	if(types[randomPosition] === "person-specific") {
		return "person-specific";
	}

	if(types[randomPosition] === "paper-specific") {
		// Person should have at least one paper
		if(!person.papers[0]) {
			return selectInsultType(person);
		} else {
			return "paper-specific";
		}
	}

	if(types[randomPosition] === "generic") {
		return "generic";
	}
}