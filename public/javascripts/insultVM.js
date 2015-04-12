define(['jquery', 'knockout-3.3.0', 'insult', 'person'], function($,ko,Insult,Person) {
	function insultVM() {
		var self = this;

		self.insults = ko.observableArray([]);
		self.persons = ko.observableArray([]);

		self.newInsult = ko.observable(new Insult({
			insultString: ""
		}));

		self.loadInsults = function() {
			$.getJSON("/api/insults", function(allData) {
	    	var mappedInsults = $.map(allData, function(insult) { 
	    		return new Insult(insult) 
	    	});
	    	self.insults(mappedInsults);
	    });
		};

		self.loadPersons = function() {
			$.getJSON("/api/persons", function(allData) {
	    	var mappedPersons = $.map(allData, function(person) { 
	    		return new Person(person) 
	    	});
	    	self.persons(mappedPersons);
	    });
		};

		self.init = function() {
			self.loadInsults();
			self.loadPersons();
		};

		self.saveNewInsult = function() {
			var data = {
				insultString: self.newInsult().insultString(),
				type: self.newInsult().insultType()
			};

			if(self.newInsult().person()) {
				data.person = self.newInsult().person().name;	
			}

			$.ajax("/api/insult", {
      	data: ko.toJSON(data),
        type: "post", contentType: "application/json",
          success: function(result) { 
          	console.log("Successfully added insult.");
          }
      }); 

			self.newInsult(new Insult({
				insultString: ""
			}));
		};
	};

	return insultVM;
});