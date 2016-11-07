var map;

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.7081, lng: -73.9571},
		zoom: 14,
		mapTypeControl: false
	});
};

var dataListings = [
	{
		'name': 'Umami Burger',
		'address': '158 N 4th St'
	},
	{
		'name': 'Blue Collar',
		'address': '160 Havemeyer St'
	},
	{
		'name': 'DuMont Burger',
		'address': '314 Bedford Ave'
	},
	{
		'name': 'Peter Luger Steak House',
		'address': '178 Broadway'
	},
	{
		'name': 'Diner',
		'address': '85 Broadway'
	},
	{
		'name': "Pop's Burger",
		'address': '167 N 8th St'
	},
	{
		'name': 'Ramen Burger',
		'address': '90 Kent Ave'
	},
	{
		'name': 'The Burger Guru',
		'address': '98 Berry St'
	},
	{
		'name': 'Allswell',
		'address': '124 Bedford Ave'
	},
	{
		'name': 'The Commodore',
		'address': '366 Metropolitan Ave'
	},
	{
		'name': "Walter Foods",
		'address': '253 Grand St'
	},
	{
		'name': 'Cow & Clover',
		'address': '291 Kent Ave'
	},
	{
		'name': 'Checkers',
		'address': '277 Broadway'
	}
];

var MapsViewModel = function() {
	var self = this;

	// Load listing data into observable array
	self.listings = ko.observableArray();
	dataListings.forEach(function(item) {
		self.listings.push({name: item.name, address: item.address});
	});

	self.filter = ko.observable('');

	// Find if a given listing is within input filter
	self.isFiltered = function(listing) {
		var name = listing.name.toLowerCase();
		var address = listing.address.toLowerCase();
		var filter = self.filter().toLowerCase();
		if (name.indexOf(filter) !== -1 || address.indexOf(filter) !== -1) {
			return true;
		}
		return false;
	};

	// Counts number of results based on filter, outputs string based on count
	self.filterCountString = ko.computed(function() {
		var count = 0;
		self.listings().forEach(function(listing) {
			if (self.isFiltered(listing))
				count++;
		});
		return '(' + count + ((count === 1) ? ' place' : ' places') + ' found)';
	}, this);
};

ko.applyBindings(new MapsViewModel);