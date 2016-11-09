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
			} else {
				alert('request failed due to: ' + status);
			}
		});
	});
};

var dataListings = [
	{ name: 'Umami Burger',
	  address: '158 N 4th St, Brooklyn, NY',
	  location: {lat: 40.71588719999999, lng: -73.9592588},
	  googleID: 'ChIJESPDHl5ZwokRcj6FbVLbuew'
	},
	{ name: 'Blue Collar',
	  address: '160 Havemeyer St, Brooklyn, NY',
	  location: {lat: 40.7114917, lng: -73.9578698},
	  googleID: 'ChIJqzsHPOBbwokRx_MN2OEJ6BM'
	},
	{ name: 'DuMont Burger',
	  address: '314 Bedford Ave, Brooklyn, NY',
	  location: {lat: 40.7136831, lng: -73.9621056},
	  googleID: 'ChIJ10LYAt9bwokRpENP2An7El8'
	},
	{ name: 'Peter Luger Steak House',
	  address: '178 Broadway, Brooklyn, NY',
	  location: {lat: 40.709819, lng: -73.962467},
	  googleID: 'ChIJR_bK295bwokR8gM6QgEdmkY'
	},
	{ name: 'Diner',
	  address: '85 Broadway, Brooklyn, NY',
	  location: {lat: 40.7106886, lng: -73.9655691},
	  googleID: 'ChIJvzYmKtlbwokRHye6SmfknDM'
	},
	{ name: "Pop's Burger",
	  address: '167 N 8th St, Brooklyn, NY',
	  location: {lat: 40.7181769, lng: -73.95702349999999},
	  googleID: 'ChIJJd87tF1ZwokRztj3_6guix4'
	},
	{ name: 'Ramen Burger',
	  address: '90 Kent Ave, Brooklyn, NY',
	  location: {lat: 40.7214853, lng: -73.9621174},
	  googleID: 'ChIJTV4tpWdZwokRtZZtuDBZjTY'
	},
	{ name: 'The Burger Guru',
	  address: '98 Berry St, Brooklyn, NY',
	  location: {lat: 40.71917699999999, lng: -73.958643},
	  googleID: 'ChIJyYFam11ZwokRWMaL1wvAFlo'
	},
	{ name: 'Allswell',
	  address: '124 Bedford Ave, Brooklyn, NY',
	  location: {lat: 40.7196568, lng: -73.9559515},
	  googleID: 'ChIJa7Bx-1xZwokRLAsf1yepN3Y'
	},
	{ name: 'The Commodore',
	  address: '366 Metropolitan Ave, Brooklyn, NY',
	  location: {lat: 40.7139371, lng: -73.9558631},
	  googleID: 'ChIJpwY0A19ZwokR3XNKVbz8Lqg'
	},
	{ name: "Walter Foods",
	  address: '253 Grand St, Brooklyn, NY',
	  location: {lat: 40.713555, lng: -73.958551},
	  googleID: 'ChIJIa3vw19ZwokR6gAqP0kXg4A'
	},
	{ name: 'Cow & Clover',
	  address: '291 Kent Ave, Brooklyn, NY',
	  location: {lat: 40.71452780000001, lng: -73.9665327},
	  googleID: 'ChIJresRPmJZwokRGNjAHuO7CQw'
	},
	{ name: 'Checkers',
	  address: '277 Broadway, Brooklyn, NY',
	  location: {lat: 40.7088007, lng: -73.9586784},
	  googleID: 'ChIJ-_HAkOBbwokRiKV330CJkBU'
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