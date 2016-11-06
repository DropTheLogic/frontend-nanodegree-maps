var MapsViewModel = function() {
	var self = this;
	// Dummy locations
	self.listings = ko.observableArray([
		{
			'name': 'Here',
			'address': '123 1 Ave'
		},
		{
			'name': 'There',
			'address': '123 2 Ave'
		},
		{
			'name': 'Everywhere',
			'address': '123 3 Ave'
		},
		{
			'name': 'Somewhere',
			'address': '123 4 Ave'
		},
		{
			'name': 'Else',
			'address': '123 5 Ave'
		},
		{
			'name': 'If',
			'address': '123 6 Ave'
		}
	]);
};

ko.applyBindings(new MapsViewModel);