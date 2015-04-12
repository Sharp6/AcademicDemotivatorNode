define(['knockout-3.3.0'], function(ko) {
	function Insult(data) {
		var self = this;

		self.insultString = ko.observable(data.insultString);
		self.person = ko.observable(data.person);
		self.insultTypeData = ko.observable(data.type);

		self.insultType = ko.computed(function() {
			if(self.insultString().match(/_topic_/))
				return "topic-specific";
			if(self.insultString().match(/_phdtitle_/))
				return "phd-specific";
			if(self.insultString().match(/_papertitle_/))
				return "paper-specific";
			if(self.person())
				return "person-specific";
			return "generic";
		});
	}

	return Insult;
});