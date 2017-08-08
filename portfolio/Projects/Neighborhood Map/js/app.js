var viewModel = function() {
    var self = this;

    self.showTheMenu = ko.observable(false);
    

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
	 	position: {lat: 33.443082, lng: -112.409176},
	 	map: map,
	 	title: "Our House"
	 });
	 var marker2 = new google.maps.Marker({
	 	position: {lat: 33.443614, lng: -112.405996},
	 	map: map,
	 	title: "Our Old House"
	 });
	 var marker3 = new google.maps.Marker({
	 	position: {lat: 33.443027, lng: -112.407235},
	 	map: map,
	 	title: "The School"
	 });
	 var marker4 = new google.maps.Marker({
	 	position: {lat: 33.453093, lng: -112.391905},
	 	map: map,
	 	title: "Quick Trip"
	 });
	 var marker5 = new google.maps.Marker({
	 	position: {lat: 33.459454, lng: -112.394149},
	 	map: map,
	 	title: "Quick Trip"
	 });
}
