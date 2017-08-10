
var showTheMenu = ko.observable(false);

var places = [
    { title: 'Elementary School', location: { lat: 33.443027, lng: -112.407235 } },
    { title: 'High School', location: { lat: 33.437227, lng: -112.398954 } },
    { title: 'Frys Marketplace', location: { lat: 33.437713, lng: -112.411278 } },
    { title: 'Quick Trip', location: { lat: 33.453093, lng: -112.391905 } },
    { title: 'Walmart', location: { lat: 33.459454, lng: -112.394149 } },
    ];

var viewModel = function() {
	var self = this;
	
	//Show or Hide The Side Menu
	self.showMenu = function(){
		showTheMenu(!showTheMenu());
	}
	
	self.myPlaces = ko.observableArray(places);
	
	
	
}//End Of View Model

ko.applyBindings(new viewModel());