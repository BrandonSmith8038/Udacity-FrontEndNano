//View Model
    places = ko.observableArray ([
    	{title: 'Elementary School', location: {lat: 33.443027, lng: -112.407235}},
    	{title: 'High School', location: {lat: 33.437227, lng: -112.398954}},
    	{title: 'Frys Marketplace', location: {lat: 33.437713, lng: -112.411278}},
    	{title: 'Quick Trip', location: {lat: 33.453093, lng: -112.391905}},
    	{title: 'Walmart', location: {lat: 33.459454, lng: -112.394149}},
    ]);

var viewModel = function() {
    var self = this;

    //Variable used to toggle the slide out menu
    self.showTheMenu = ko.observable(false);
    
    //variables to store the marker locations as well as the li's in the slide out menu

    //Toggles the visibility of the slide out menu
    self.showMenu = function() {
        self.showTheMenu(!self.showTheMenu());
    }
		//Initialize The Map
		 //Place Markers On The Map

	 
			
}

    
ko.applyBindings(new viewModel());

//Model
	 function initMap() {
		 var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 33.450121, lng: -112.401882 },
			zoom: 15,
			disableDefaultUI: true
		});
		 createMakers();
	};
	createMakers = function() {
	 for (var i = 0; i < places.length;i++) {
	    var location = places[i].location;
	    var marker1 = new google.maps.Marker({
	        map: map,
	        position: location
	    	});
		}
	}

