'use scrict';

var app = app || {};

(function(module) {
  $('#results').hide();

  var mapProp= {
    center: new google.maps.LatLng(47.6111267,-122.3314114),
    zoom:14,
    mapTypeControl: false,
    StreetViewControlOptions:false,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ]
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  let markers = [];

  map.addListener('click', function(event) {
    $('#results').hide();

    deleteMarkers();
    placeMarker(event.latLng);
    $('#address').text(event.latLng);
    $('#results').fadeIn(1000);
    $('#pac-input').empty();
  });

  
  
  $.getJSON(`${app.ENVIRONMENT.apiUrl}/data/sea-gov/latlngall`)
    .then(result => {
      var latLngAll = result.map((e) => {
        return {
          lat: e.latitude,
          lng: e.longitude
        }
      });
      
      let data1 = latLngAll.map((a) => {
        return new google.maps.LatLng(a.lat, a.lng);
      });

      console.log(data1);
      
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: data1,
        map: map,
        radius:35,
        gradient: [
          'rgba(102, 188, 188, 0)',
          'rgba(102, 188, 188, 0.5)',
          'rgba(22, 120, 166, 0.5)',
          'rgba(255, 165, 30, 0.5)',
          'rgba(255, 152, 56, 0.5)'
        ]
      });

      heatmap.setMap(map);
    })
    .catch(console.error);

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
        app.initPlotly(result);
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
    $('#results').hide();
    deleteMarkers();

    var places = searchBox.getPlaces();
    console.log(places[0].formatted_address);
    $('#address').text(places[0].formatted_address);
    $('#results').fadeIn(1000);


    if (places.length == 0) {
      return;
    }

    var bounds = new google.maps.LatLngBounds();
    
    places.forEach(function(place) {
      
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      placeMarker(places[0].geometry.location);
    });
  
    map.fitBounds(bounds); 
  });

})(app);