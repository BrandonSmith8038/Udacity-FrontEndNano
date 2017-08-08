var viewModel = function() {
    var self = this;

    self.showTheMenu = ko.observable(true);
    
    self.markers = ko.observableArray ([
    	{title: 'Elementary School', location: {lat: 33.443027, lng: -112.407235}},
    	{title: 'High School', location: {lat: 33.437227, lng: -112.398954}},
    	{title: 'Frys Marketplace', location: {lat: 33.437713, lng: -112.411278}},
    	{title: 'Quick Trip', location: {lat: 33.453093, lng: -112.391905}},
    	{title: 'Walmart', location: {lat: 33.459454, lng: -112.394149}},
    ]);

    self.showMenu = function() {
        self.showTheMenu(!self.showTheMenu());
    }

};

    
ko.applyBindings(new viewModel());


function initMap() {
	 var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.450121, lng: -112.401882 },
		zoom: 15,
		disableDefaultUI: true
	});
	 var marker1 = new google.maps.Marker({
	 	position: {lat: 33.437227, lng: -112.398954},
	 	map: map,
	 	title: "High School"
	 });
	 var marker2 = new google.maps.Marker({
	 	position: {lat: 33.437713, lng: -112.411278},
	 	map: map,
	 	title: "Fry's Marketplace"
	 });
	 var marker3 = new google.maps.Marker({
	 	position: {lat: 33.443027, lng: -112.407235},
	 	map: map,
	 	title: "Elementary School"
	 });
	 var marker4 = new google.maps.Marker({
	 	position: {lat: 33.453093, lng: -112.391905},
	 	map: map,
	 	title: "Quick Trip"
	 });
	 var marker5 = new google.maps.Marker({
	 	position: {lat: 33.459454, lng: -112.394149},
	 	map: map,
	 	title: "Walmart"
	 });
}
