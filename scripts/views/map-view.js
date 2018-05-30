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
    console.log('click data',dataLatLng);
    
    $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov/latlng`, {dataLatLng})
      .then( result => {
        $('#crime-rows').text(result.length);
      })
      .catch(console.error) 
  }
//From Google Maps API Documentation
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

          let Marker = 
            new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });

          let dataLatLng = {
            lat: Marker.position.lat(),
            lng: Marker.position.lng()
          };
          console.log('search data',dataLatLng);

          markers.push(Marker);

          $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov/latlng`, {dataLatLng})
          .then( result => {
            $('#crime-rows').text(result.length);
          })
          .catch(console.error) 

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          });
        
          map.fitBounds(bounds);

          
    
        });
    





})(app);