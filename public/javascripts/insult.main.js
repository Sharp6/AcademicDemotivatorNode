require.config({
	shim: {
		"bootstrap" : { "deps": ['jquery'] }
	},
	paths: {
		jquery: 'jquery-2.1.3.min',
		bootstrap: 'bootstrap.min'
	}
});

require(['knockout-3.3.0', 'insultVM', 'jquery', 'bootstrap'], function(ko, insultVM, $, bootstrap) {
    var iVm = new insultVM();
    iVm.init();
    ko.applyBindings(iVm);
});