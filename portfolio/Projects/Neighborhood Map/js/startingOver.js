//Initialize Some Global Variables To Be Used Later
var showTheMenu = ko.observable(false);
var map;
var markers = [];


var places = [{
	title: 'Senor Taco',
	location: {
		lat: 33.452497,
		lng: -112.391994
	}
}, {
	title: 'Longhorn Corral',
	location: {
		lat: 33.466377,
		lng: -112.478517
	}
}, {
	title: 'Roman\'s Oasis',
	location: {
		lat: 33.435431,
		lng: -112.421409
	}
}, {
	title: 'Wildflower Bread Company',
	location: {
		lat: 33.462247,
		lng: -112.359319
	}
}, {
	title: 'Yan\'s',
	location: {
		lat: 33.456911,
		lng: -112.393888
	}
}, {
	title: 'Gus\'s New York Pizza & Bar',
	location: {
		lat: 33.465505,
		lng: -112.356812
	}
}, {
	title: 'Black Bear Diner',
	location: {
		lat: 33.456868,
		lng: -112.341400
	}
}, {
	title: 'Sammy\'s Burger',
	location: {
		lat: 33.452322,
		lng: -112.391574
	}
}, {
	title: 'Sal\'s Tuscan Grill',
	location: {
		lat: 33.463317,
		lng: -112.344915
	}
}, {
	title: 'Cracker Barrel Old Country Store',
	location: {
		lat: 33.459621,
		lng: -112.357383
	}


}];

var viewModel = function() {
		var self = this;

		//Show or Hide The Side Menu
		self.showMenu = function() {
			showTheMenu(!showTheMenu());
		}

		self.myPlaces = ko.observableArray([{
			title: 'Senor Taco',
			location: {
				lat: 33.452497,
				lng: -112.391994
			}
		}, {
			title: 'Longhorn Corral',
			location: {
				lat: 33.466377,
				lng: -112.478517
			}
		}, {
			title: 'Roman\'s Oasis',
			location: {
				lat: 33.435431,
				lng: -112.421409
			}
		}, {
			title: 'Wildflower Bread Company',
			location: {
				lat: 33.462247,
				lng: -112.359319
			}
		}, {
			title: 'Yan\'s',
			location: {
				lat: 33.456911,
				lng: -112.393888
			}
		}, {
			title: 'Gus\'s New York Pizza & Bar',
			location: {
				lat: 33.465505,
				lng: -112.356812
			}
		}, {
			title: 'Black Bear Diner',
			location: {
				lat: 33.456868,
				lng: -112.341400
			}
		}, {
			title: 'Sammy\'s Burger',
			location: {
				lat: 33.452322,
				lng: -112.391574
			}
		}, {
			title: 'Sal\'s Tuscan Grill',
			location: {
				lat: 33.463317,
				lng: -112.344915
			}
		}, {
			title: 'Cracker Barrel Old Country Store',
			location: {
				lat: 33.459621,
				lng: -112.357383
			}

		}]);

		self.clickMarker = function(places) {

			google.maps.event.trigger(places.marker, 'click');

		}

		//ko.computed and ko.utils.arrayFilter learned from http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html

		//Function to filter out the myPlaces() variable and the markers dependent on what is in the search box
		self.filter = ko.observable('');
		self.filteredLocations = ko.computed(function() {
			var filter = self.filter().toLowerCase();
			if (!filter) {
				self.myPlaces().forEach(function(location) {
					if (location.marker) {
						location.marker.setVisible(true);
					}
				});
				return self.myPlaces();
			} else {
				return ko.utils.arrayFilter(self.myPlaces(), function(location) {
					if (location.title.toLowerCase().indexOf(filter) > -1) {
						location.marker.setVisible(true);
						return true
					} else {
						location.marker.setVisible(false)
						return false
					}
				});
			}
		}, self);

	} //End Of View Model
var vm = new viewModel();
ko.applyBindings(vm);



//Initialize The Map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 33.450121,
			lng: -112.401882
		},
		zoom: 13,
		disableDefaultUI: true
	});
	//Loop Through The Array Of Places and use the object properties to create markers on the map
	for (var i = 0; i < places.length; i++) {
		var location = places[i].location;
		var title = places[i].title

		var marker = new google.maps.Marker({
			map: map,
			position: location,
			title: title
		});
		var largeInfoWindow = new google.maps.InfoWindow();
		//Bind the marker to each of the locations in the side bar
		vm.myPlaces()[i].marker = marker;

		//place the newely created marker into the global markers array
		markers.push(marker);

		//Event listener to animate the marker on click
		marker.addListener('click', function() {
			showInfoWindow(this, largeInfoWindow);
			var self = this;
			self.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				self.setAnimation(null);
			}, 2400);
		});

	} //End of the markers loop

	function getFourSquareData() {
		var clientID = "O14P1ZP42RQEPCNZHR1PL2GTZAIWL3QT3BZMMVL21CJFVGRA";
		var clientSecret = "C0D31BCWQ321L1TRV3DTSXYN43B1IJHWVFS4FEPKTXMEWBFL";
		var venueID = "4bc36ac9b492d13a25b8a860"
		var baseURL = "https://api.foursquare.com/v2/venues/"
		var date = new Date();
		var version = date.getTime();

		var fourSquareUrl = baseURL + "" + venueID + "?v=" + version + "&client_id=" + clientID + "&client_secret=" + clientSecret;
		console.log(fourSquareUrl);
	}
	getFourSquareData();

	//Grabs place details and places into an info window above the marker
	function showInfoWindow(marker, infowindow) {
		if (infowindow.marker != marker) {
			infowindow.setContent(marker.title);
			infowindow.marker = marker;
			infowindow.open(map, marker);
			infowindow.addListener('closeclick', function() {
				marker.setAnimation(null);
			})
		}
	}

} // End of  initMap Function