//Initialize Some Global Variables To Be Used Later
var showTheMenu = ko.observable(false);
var map;
var markers = [];


var places = [{
	title: 'Elementary School',
	location: {
		lat: 33.443027,
		lng: -112.407235
	}
}, {
	title: 'High School',
	location: {
		lat: 33.437227,
		lng: -112.398954
	}
}, {
	title: 'Frys Marketplace',
	location: {
		lat: 33.437713,
		lng: -112.411278
	}
}, {
	title: 'Quick Trip',
	location: {
		lat: 33.453093,
		lng: -112.391905
	}
}, {
	title: 'Walmart',
	location: {
		lat: 33.459454,
		lng: -112.394149
	}
}];

var viewModel = function() {
		var self = this;

		//Show or Hide The Side Menu
		self.showMenu = function() {
			showTheMenu(!showTheMenu());
		}

		self.myPlaces = ko.observableArray([{
			title: 'Elementary School',
			location: {
				lat: 33.443027,
				lng: -112.407235
			}
		}, {
			title: 'High School',
			location: {
				lat: 33.437227,
				lng: -112.398954
			}
		}, {
			title: 'Frys Marketplace',
			location: {
				lat: 33.437713,
				lng: -112.411278
			}
		}, {
			title: 'Quick Trip',
			location: {
				lat: 33.453093,
				lng: -112.391905
			}
		}, {
			title: 'Walmart',
			location: {
				lat: 33.459454,
				lng: -112.394149
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
		zoom: 15,
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