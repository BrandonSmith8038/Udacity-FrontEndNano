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
		center: {lat: 33.442930, lng: -112.407132 },
		zoom: 13
	});
}
