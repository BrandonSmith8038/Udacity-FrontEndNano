//View Model
var places = [
    { title: 'Elementary School', location: { lat: 33.443027, lng: -112.407235 } },
    { title: 'High School', location: { lat: 33.437227, lng: -112.398954 } },
    { title: 'Frys Marketplace', location: { lat: 33.437713, lng: -112.411278 } },
    { title: 'Quick Trip', location: { lat: 33.453093, lng: -112.391905 } },
    { title: 'Walmart', location: { lat: 33.459454, lng: -112.394149 } },
];

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

//Create empty array to store the markers
var markers = [];
//Initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.450121, lng: -112.401882 },
        zoom: 15,
        disableDefaultUI: true
    });

    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    //Loop through the places array and place them on map
    for (var i = 0; i < places.length; i++) {
        var location = places[i].location;
        var title = places[i].title

        var marker = new google.maps.Marker({
            map: map,
            position: location,
            title: title
        });
        // marker.addListener('click', toggleBounce);
        //Push the marker to our of markers.
        markers.push(marker);
        //Extend the boundaries of the map for each marker
        bounds.extend(marker.position);
        // Create an onclick even to open an infowindow at each marker
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow)
        });
        marker.addListener('click', function() {
            var self = this;
            self.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.setAnimation(null);
            }, 2000);
        });

    }
    //Fit the map to the new bounds determined by the markers placed
    map.fitBounds(bounds);
};

function populateInfoWindow(marker, infowindow) {
    //check to make sure the info window is not already opened on this marker
    if (infowindow.marker != marker) {
        infowindow.setContent("<div>" + marker.title + "</div>");
        infowindow.open(map, marker);
        //make sure the marker property is cleared if the infowindow is close
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker(null);
        });
    }
}

// function toggleBounce() {
//         if (this.getAnimation() !== null) {
//           this.setAnimation(null);
//         } else {
//           this.setAnimation(google.maps.Animation.BOUNCE);
//         }
//       }