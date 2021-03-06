var map;
var mapBounds;
var infoWindow;
var infoWindowLink;
var foursquareError;

// Array of markers for the map
var markers = [];
var markersReady = ko.observable(false);

// Array of listings for list view of locations
var listings = [];
var selectedListing = ko.observable();

// Array of venue location data
var dataListings = [
	{ name: 'Umami Burger',
	  address: '158 N 4th St, Brooklyn, NY',
	  location: {lat: 40.71588719999999, lng: -73.9592588},
	  googleID: 'ChIJESPDHl5ZwokRcj6FbVLbuew',
	  foursquareID: '54233f50498e70470c230a9e'
	},
	{ name: 'Blue Collar',
	  address: '160 Havemeyer St, Brooklyn, NY',
	  location: {lat: 40.7114917, lng: -73.9578698},
	  googleID: 'ChIJqzsHPOBbwokRx_MN2OEJ6BM',
	  foursquareID: '4ffe3889e4b01d5de4d4a81a'
	},
	{ name: 'DuMont Burger',
	  address: '314 Bedford Ave, Brooklyn, NY',
	  location: {lat: 40.7136831, lng: -73.9621056},
	  googleID: 'ChIJ10LYAt9bwokRpENP2An7El8',
	  foursquareID: '439308daf964a520712b1fe3'
	},
	{ name: 'Peter Luger Steak House',
	  address: '178 Broadway, Brooklyn, NY',
	  location: {lat: 40.709819, lng: -73.962467},
	  googleID: 'ChIJR_bK295bwokR8gM6QgEdmkY',
	  foursquareID: '3fd66200f964a5209beb1ee3'
	},
	{ name: 'Diner',
	  address: '85 Broadway, Brooklyn, NY',
	  location: {lat: 40.7106886, lng: -73.9655691},
	  googleID: 'ChIJvzYmKtlbwokRHye6SmfknDM',
	  foursquareID: '3fd66200f964a5207feb1ee3'
	},
	{ name: "Pops",
	  address: '167 N 8th St, Brooklyn, NY',
	  location: {lat: 40.7181769, lng: -73.95702349999999},
	  googleID: 'ChIJJd87tF1ZwokRztj3_6guix4',
	  foursquareID: '4a23d6c0f964a520dd7d1fe3'
	},
	{ name: 'Ramen Burger',
	  address: '90 Kent Ave, Brooklyn, NY',
	  location: {lat: 40.7214853, lng: -73.9621174},
	  googleID: 'ChIJTV4tpWdZwokRtZZtuDBZjTY',
	  foursquareID: '5532b4a8498ee29a1298a6c3'
	},
	{ name: 'The Burger Guru',
	  address: '98 Berry St, Brooklyn, NY',
	  location: {lat: 40.71917699999999, lng: -73.958643},
	  googleID: 'ChIJyYFam11ZwokRWMaL1wvAFlo',
	  foursquareID: '4df41f33aeb7170aa2f3adf4'
	},
	{ name: 'Allswell',
	  address: '124 Bedford Ave, Brooklyn, NY',
	  location: {lat: 40.7196568, lng: -73.9559515},
	  googleID: 'ChIJa7Bx-1xZwokRLAsf1yepN3Y',
	  foursquareID: '4e18c39da8097d08b23ac35d'
	},
	{ name: 'The Commodore',
	  address: '366 Metropolitan Ave, Brooklyn, NY',
	  location: {lat: 40.7139371, lng: -73.9558631},
	  googleID: 'ChIJpwY0A19ZwokR3XNKVbz8Lqg',
	  foursquareID: '4bd254bd77b29c743da18e82'
	},
	{ name: "Walter Foods",
	  address: '253 Grand St, Brooklyn, NY',
	  location: {lat: 40.713555, lng: -73.958551},
	  googleID: 'ChIJIa3vw19ZwokR6gAqP0kXg4A',
	  foursquareID: '49c3df11f964a52081561fe3'
	},
	{ name: 'Cow & Clover',
	  address: '291 Kent Ave, Brooklyn, NY',
	  location: {lat: 40.71452780000001, lng: -73.9665327},
	  googleID: 'ChIJresRPmJZwokRGNjAHuO7CQw',
	  foursquareID: '5407a76e498e743eaa26f8a4'
	},
	{ name: 'Checkers',
	  address: '277 Broadway, Brooklyn, NY',
	  location: {lat: 40.7088007, lng: -73.9586784},
	  googleID: 'ChIJ-_HAkOBbwokRiKV330CJkBU',
	  foursquareID: '4c9bd1140313370443af4fd5'
	}
];

// Google Maps callback, create map object
var initMap = function() {
	// Styles array for map
	var styles = [
		{
			"elementType": "geometry",
			"stylers": [
				{"color": "#ebe3cd"}
			]
		},
		{
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#523735"}
		]
		},
		{
		"elementType": "labels.text.stroke",
		"stylers": [
			{"color": "#f5f1e6"}
		]
		},
		{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [
			{"color": "#c9b2a6"}
		]
		},
		{
		"featureType": "administrative.land_parcel",
		"elementType": "geometry.stroke",
		"stylers": [
			{"color": "#dcd2be"}
		]
		},
		{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#ae9e90"}
		]
		},
		{
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [
			{"color": "#dfd2ae"}
		]
		},
		{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{"color": "#dfd2ae"}
		]
		},
		{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#93817c"}
		]
		},
		{
		"featureType": "poi.business",
		"stylers": [
			{"visibility": "off"}
		]
		},
		{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
			{"color": "#a5b076"}
		]
		},
		{
		"featureType": "poi.park",
		"elementType": "labels.text",
		"stylers": [
			{"visibility": "off"}
		]
		},
		{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#447530"}
		]
		},
		{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{"color": "#f5f1e6"}
		]
		},
		{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
			{"color": "#fdfcf8"}
		]
		},
		{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{"color": "#f8c967"}
		]
		},
		{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
			{"color": "#e9bc62"}
		]
		},
		{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry",
		"stylers": [
			{"color": "#e98d58"}
		]
		},
		{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry.stroke",
		"stylers": [
			{"color": "#db8555"}
		]
		},
		{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#806b63"}
		]
		},
		{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
			{"color": "#dfd2ae"}
		]
		},
		{
		"featureType": "transit.line",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#8f7d77"}
		]
		},
		{
		"featureType": "transit.line",
		"elementType": "labels.text.stroke",
		"stylers": [
			{"color": "#ebe3cd"}
		]
		},
		{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
			{"color": "#dfd2ae"}
		]
		},
		{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
			{"color": "#b9d3c2"}
		]
		},
		{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{"color": "#92998d"}
		]
		}
	];

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.713555, lng: -73.958551},
		zoom: 15,
		styles: styles,
		mapTypeControl: false
	});

	infoWindow = new google.maps.InfoWindow();
	mapBounds = new google.maps.LatLngBounds();

	// Fill markers array with listings
	createMarkers(0);

	// Listener to make sure markers stay visible on window re-size
	google.maps.event.addDomListener(window, 'resize', function() {
		map.fitBounds(mapBounds);
	});
};

/**
 * Returns Google Maps marker object, along with data from dataListings array.
 * @constructor
 * @param {object} data - Single data object from the dataListings array
 * @param {object} place - Place data object returned from google maps api
 */
var Marker = function Marker(data, place) {
	var marker = new google.maps.Marker({
		position: data.location,
		icon: {
			url: 'img/hamburger-pin-brown.png',
			scaledSize : new google.maps.Size(55, 36)},
		animation: google.maps.Animation.DROP,
		foursquareID: data.foursquareID,
		googleID: data.googleID,
		name: place.name,
		address: place.formatted_address,
		index: dataListings.indexOf(data)
	});
	return marker;
};

/**
 * Creates and pushes a Google Maps marker object into markers array.
 * Calls itself until whole array dataListings array is parsed.
 * @param {integer} i - Used to iterate through data array recursevly.
 */
var createMarkers = function(i) {
	var data = dataListings[i];
	var pService = new google.maps.places.PlacesService(map);
	// Initiate Google maps places request
	pService.getDetails({'placeId': data.googleID}, function(place, status) {
		// Make sure Google maps api request is ok
		if (status === 'OK') {
			// Create new marker
			var marker = new Marker(data, place);
			// Fetch and load Foursquare Data
			getFoursquareData(marker);
			// Push marker into array
			markers[dataListings.indexOf(data)] = marker;
			// Add click listener
			marker.addListener('click', function() {
				// Stop any 'clicked' markers from animating
				markers.forEach(function(marker) {
					if (marker.setAnimation) {
						marker.setAnimation(null);
					}
				});
				// Animate this marker
				marker.setAnimation(google.maps.Animation.BOUNCE);
				//Select the corresponding listing for this marker
				selectedListing(listings[this.index]);
				// Open infoWindow for this marker
				openInfoWindow(this, infoWindow);
			});
			// Add listeners to change marker icon color
			marker.addListener('mouseover', function() {
				this.setIcon({
					url: 'img/hamburger-pin-red.png',
					scaledSize : new google.maps.Size(55, 36)
				});
			});
			marker.addListener('mouseout', function() {
				this.setIcon({
					url: 'img/hamburger-pin-brown.png',
					scaledSize : new google.maps.Size(55, 36)
				});
			});
			// Set marker on map
			marker.setMap(map);
			marker.setVisible(true);
			// Send marker data to listings array
			loadMarkerIntoListing(marker);
		}
		else {
			alert('Google Maps request failed due to: ' + status +
				". So there won't be a marker for " + dataListings[i].name +
				'. Sorry!');
		}

		// Itertate to next dataListing, create and push next marker
		if (++i < dataListings.length) {
			// Use setTimeout to avoid going over google query limit
			setTimeout(function() {
				createMarkers(i);
			}, 150);
		}

		// If all markers loaded, center map and send ready message
		else {
			centerMap();
			console.log('markers loaded');
			markersReady(true);
		}
	});
};

// Error handling for google maps api load error
var googleMapsError = function() {
	alert('Error reaching Google Maps! Try reloading or ensuring you have internet connectivity.');
};

/**
 * Requests Foursquare data and places formatted data inside given marker
 * @param {object} marker - Marker object to add additional properties to
 */
var getFoursquareData = function(marker) {
	// Create request url string
	var url = 'https://api.foursquare.com/v2/venues/' + marker.foursquareID;
	url += '?' + $.param({
		'client_secret' : 'APIKEY',
		'client_id' : 'APIKEY',
		'v' : 20161111
	});

	// Make data request
	$.ajax({
		url: url,
		type: 'GET',
		async: true,
		dataType: 'json',
		success: function(data) {
			var venue = data.response.venue;
			// Place business wesite urls
			if (venue.url) {
				listings[marker.index].website(venue.url);
			}
			if (venue.shortUrl) {
				listings[marker.index].fsPage(venue.shortUrl);
			}

			// Place photo data
			if (venue.bestPhoto) {
				var picSize = 'height100';
				var photoURL = venue.bestPhoto.prefix;
				photoURL += picSize + venue.bestPhoto.suffix;
				marker.photo = '<img src="' + photoURL +
					'" class="photo-frame" width="110" height="110" ' +
					'alt="Foursquare photo of restaurant"/>';
				var miniPic = '<img src="' + photoURL +
					'" class="mini-photo-frame" width="55" height="55" ' +
					'alt="Foursquare photo of restaurant"/>';
				loadPicIntoListing(marker.index, miniPic);
			}

			// Place hours data
			if (venue.hours) {
				var hours = venue.hours;
				// Display currently open or closed info
				if (hours.isOpen) {
					marker.isOpen = '<div class="open-now"> Open Now! </div>';
				}
				else {
					marker.isOpen = '<div class="closed"> (Currenly Closed) </div>';
				}
				// Dipsplay Business Hours
				marker.hours = '<div class="section-head"> Hours:';
				hours.timeframes.forEach(function (timeframe) {
					marker.hours +=
						'<div class="section-sub">' + timeframe.days +
						' : ' + timeframe.open[0].renderedTime + '</div>';
				});
				marker.hours += '</div>';
			}

			// Place rating info
			if (venue.rating) {
				var color = (venue.rating >= 8.7) ?
					'great' : ((venue.rating >= 7) ? 'good' : 'fair');
				marker.rating = '<div class="rating ' +
					color + '">' + venue.rating.toFixed(1) + '</div>' +
					'<div class="rating-text">Foursquare<br>Rating</div>';
			}

			// Place description data
			if (venue.description)
				marker.description = venue.description;

			// Place tips data
			if (venue.tips) {
				var tipsHTML = '<ul class="tips">';
				var tipData = venue.tips.groups[0];
				var tipsLimit = (tipData.count < 15) ? tipData.count : 15;
				for (var i = 0; i < tipsLimit; i++) {
					var tip = tipData.items[i];
					if (tip.text.indexOf('burger') >= 0) {
						tipsHTML +=
							'<li>' + tip.text + ' - ' + tip.user.firstName + '</li>';
					}
				}
				tipsHTML += '</ul>';
				marker.tips = tipsHTML;
			}
		},
		error: function(data) {
			// If no previous errors, start an error message
			if (!foursquareError) {
				foursquareError = 'There was an error requesting Foursquare data, ' +
				"so unfortunately you won't see too much info " +
				'about the following place(s):\n' + '* ' + marker.name + '\n';
			}
			// Otherwise, add this location error to the message
			else {
				foursquareError += ('* ' + marker.name + '\n');
			}
			// If all places have been parsed, display error message
			if (marker.index === dataListings.length - 1) {
				alert(foursquareError);
			}
		}
	});
};

/*
 * Opens Google Maps infoWindow for given marker by parsing and formatting data.
 * @param {object} marker - Supplies data for infoWindow.
 */
var openInfoWindow = function(marker) {
	var title = '<h3 class="info-window-title">' + marker.name + '</h3>';
	var address = '<div>' + marker.address + '</div>';
	var contentHTML = '<div class="info-window">';
	if (marker.photo) {
		contentHTML += marker.photo;
	}
	contentHTML += title + address;
	contentHTML += '<div class="section"><div class="col-75">';
	if (marker.hours) {
		contentHTML += marker.hours;
		contentHTML += marker.isOpen;
	}
	contentHTML += '</div><div class="col-25">';
	if (marker.rating) {
		contentHTML += marker.rating;
	}
	contentHTML += '</div></div>';
	contentHTML += '<hr />';
	if (marker.description) {
		contentHTML += marker.description;
	}
	if (marker.tips) {
		contentHTML += '<h5>Tips from Foursquare users:</h5>';
		contentHTML += marker.tips;
	}
	contentHTML += '</div>';
	infoWindow.setContent(contentHTML);
	infoWindow.marker = marker;
	// Add close listener, in order to re-enter map on close and stop animations
	google.maps.event.addListener(infoWindow, 'closeclick', function() {
		marker.setAnimation(null);
		centerMap();
		// Reset selected listing
		selectedListing('');
	});

	infoWindow.open(map, marker);
};

// Centers map around visible markers
var centerMap = function() {
	// Extend map bounds to include visible markers
	markers.forEach(function(marker) {
		if (marker.position) {
			mapBounds.extend(marker.position);
		}
	});
	// Fit map to bounds
	map.fitBounds(mapBounds);
};

// Loads given marker data into list view listing
var loadMarkerIntoListing = function(marker) {
	listings[marker.index].name(marker.name);
	listings[marker.index].address(marker.address);
};

// Loads photo into list view listing
var loadPicIntoListing = function(i, html) {
	listings[i].pic(html);
};

var MapsViewModel = function() {
	var self = this;

	// String for loading text animation
	self.ellipses = ko.observable('');
	// Animates loading text
	self.loading = ko.computed(function() {
		// Use setInterval to add to the ellipses, or to revert text
		if (!markersReady()) {
			self.animate = setInterval(function() {
				(self.ellipses().length < 3) ?
					self.ellipses(self.ellipses() + '.') : self.ellipses('');
			}, 750);
		}
		// When markers are loaded, clearInterval
		else {
			clearInterval(self.animate);
		}
		return self.ellipses;
	}, this);

	// Handle state of slide-out panel for listings
	self.panelIsOpen = ko.observable(false);
	self.toggleSidePanel = function() {
		(self.panelIsOpen()) ? self.panelIsOpen(false) : self.panelIsOpen(true);
	};
	self.closeSidePanel = function() {
		if (self.panelIsOpen) {
			self.panelIsOpen(false);
		}
	};

	// If side panel state is off, adjust CSS classes for side-panel and tab
	self.setSidePanelCSS = ko.computed(function() {
		return (self.panelIsOpen()) ? 'side-panel-open' : 'side-panel-closed';
	}, this);
	self.setTabCSS = ko.computed(function() {
		return (self.panelIsOpen()) ? 'tab-open' : 'tab-closed';
	}, this);

	// Initialize listings array with objects containing observables
	for (var i = 0; i < dataListings.length; i++) {
		listings[i] = {
			'index': i,
			'pic' : ko.observable(''),
			'name': ko.observable(''),
			'address': ko.observable(''),
			'website': ko.observable(''),
			'fsPage': ko.observable('')
		};
	}

	self.filter = ko.observable('');

	/*
	 * Returns true if a given listing is within the self.filter observable.
	 * Also displays/hides corresponding map markers for any filtered listings.
	 * @param {object} listing - Object with attributes to test against a filter
	 */
	self.isFiltered = function(listing) {
		if (listing.name() && listing.address()) {
			var name = listing.name().toLowerCase();
			var address = listing.address().toLowerCase();
			var filter = self.filter().toLowerCase();
			if (name.indexOf(filter) !== -1 || address.indexOf(filter) !== -1) {
				// Diplay corresponding marker if listing is within the filter
				if (markersReady()) {
					markers[listing.index].setVisible(true);
					centerMap();
				}
				return true;
			}
			// Remove marker if not included in filter
			else {
				markers[listing.index].setVisible(false);
			}
		}
		return false;
	};

	// Clears filter if ESC is pressed
	self.esc = function(data, event) {
		if (event && event.keyCode === 27) {
			self.filter('');
			return true;
		}
		else
			return true;
	};

	// Counts number of results based on filter, outputs string based on count
	self.filterCountString = ko.computed(function() {
		var count = 0;
		listings.forEach(function(listing) {
			if (self.isFiltered(listing))
				count++;
		});
		return '(' + count + ((count === 1) ? ' place' : ' places') + ' found)';
	}, this);
};

ko.applyBindings(new MapsViewModel());