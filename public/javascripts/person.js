define(['knockout-3.3.0'], function(ko) {
	function Person(data) {
		var self = this;

		self.name = ko.observable(data.name);
	}

	return Person;
});