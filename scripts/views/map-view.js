'use scrict';

var app = app || {};

(function(module) {
  var mapProp= {
    center: new google.maps.LatLng(47.6182479,-122.3524182),
    zoom:13,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  let markers = [];

  map.addListener('click', function(event) {
    deleteMarkers();
    placeMarker(event.latLng);
  });

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  function placeMarker(location) {
    let marker = new google.maps.Marker({
      position: location, 
      map: map,
    });
    markers.push(marker);

    let dataLatLng = {
      lat: marker.position.lat(),
      lng: marker.position.lng()
    }   
    console.log(dataLatLng);
    
    $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov/latlng`, {dataLatLng})
      .then( result => {
        $('#crime-rows').text(result.length);
      })
      .catch(console.error) 
  }
})(app);