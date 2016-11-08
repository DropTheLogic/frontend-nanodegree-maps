var map;

// Array of markers for the map
var markers = [];

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.7081, lng: -73.9571},
		zoom: 14,
		mapTypeControl: false
	});

	var infoWindow = new google.maps.InfoWindow();
	var pService = new google.maps.places.PlacesService(map);

	// Fill markers array with listings
	dataListings.forEach(function(data) {
		if (data.googleID)
		pService.getDetails({'placeId': data.googleID}, function(place, status) {
			if (status === 'OK') {
				var marker = new google.maps.Marker({
					position: place.geometry.location,
					title: place.name,
					animation: google.maps.Animation.DROP
				});
				// Place marker on map
				marker.setMap(map);
				// Push marker into array
				markers.push(marker);
				// TODO: Create click event for infoWindow on each marker
			}
			// TODO: Make error handling
		});
	});
};

var dataListings = [
	{ name: 'Umami Burger',
	  address: '158 N 4th St, Brooklyn, NY',
	  googleID: 'ChIJESPDHl5ZwokRcj6FbVLbuew'
	},
	{ name: 'Blue Collar',
	  address: '160 Havemeyer St, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'DuMont Burger',
	  address: '314 Bedford Ave, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Peter Luger Steak House',
	  address: '178 Broadway, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Diner',
	  address: '85 Broadway, Brooklyn, NY',
	  googleID: ''
	},
	{ name: "Pop's Burger",
	  address: '167 N 8th St, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Ramen Burger',
	  address: '90 Kent Ave, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'The Burger Guru',
	  address: '98 Berry St, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Allswell',
	  address: '124 Bedford Ave, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'The Commodore',
	  address: '366 Metropolitan Ave, Brooklyn, NY',
	  googleID: ''
	},
	{ name: "Walter Foods",
	  address: '253 Grand St, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Cow & Clover',
	  address: '291 Kent Ave, Brooklyn, NY',
	  googleID: ''
	},
	{ name: 'Checkers',
	  address: '277 Broadway, Brooklyn, NY',
	  googleID: ''
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