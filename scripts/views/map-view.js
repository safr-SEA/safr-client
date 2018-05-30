'use scrict';

var app = app || {};

(function(module) {

  function myMap() {
    var mapProp= {
        center: new google.maps.LatLng(47.6182479,-122.3524182),
        zoom:13,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    map.addListener('click', function(event) {
      
      placeMarker(event.latLng);
  
      function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map
        });

        let dataLatLng = JSON.stringify({
          lat: marker.position.lat(),
          lng: marker.position.lng()
        })
        console.log(dataLatLng);

        $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov/latlng`, {dataLatLng})
          .then(console.log)
          .catch(console.error)
      }
    });
  }
  
  myMap();

})(app);