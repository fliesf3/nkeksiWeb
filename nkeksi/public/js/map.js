function initMap() {

  var broadway = {
    info: '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
    lat: 4.640742576061045 , 
    long: 11.366629928125008
  };

  var belmont = {
    info: '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
    lat: 4.5840742576061045 ,
    long: 10.366629928125008
  };

  var sheridan = {
    info: '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
    lat: 4.8840742576061045,
    long: 10.366629928125008
  };

  var locations = [
      [broadway.info, broadway.lat, broadway.long, 0],
      [belmont.info, belmont.lat, belmont.long, 1],
      [sheridan.info, sheridan.lat, sheridan.long, 2],
    ];

  var map = new google.maps.Map(document.getElementById('mapResto'), {
    zoom: 8,
    center: new google.maps.LatLng(4.8840742576061045 , 10.366629928125008),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}