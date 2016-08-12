<<<<<<< HEAD
var myApp = angular.module('monsterApp',[]);
myApp.controller('monsterController', function($scope, $http) {

=======
var myApp = angular.module('cityApp',[]);
myApp.controller('cityController', function($scope, $http) {
>>>>>>> origin/master
    $scope.Math = window.Math;
    var myLatlng = {lat: 40.000, lng: -98.000};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: myLatlng,
      mapTypeId: 'terrain'
    });

    var markers = [];
    var infoWindow = new google.maps.InfoWindow({});

    var apiKey = 'AIzaSyDU6EmqpUmvTiwjIZDIayOrd0Kev8Y2WxM';
<<<<<<< HEAD
=======
    var elevator = new google.maps.ElevationService;
>>>>>>> origin/master

    function createMarker(city){
        var icon = '';
        if(city.yearRank % 2 == 0){
            icon = 'zombie.png';
        }else{
            icon = 'hero.png';
        }
        var cityLatlng = {lat: city.lat, lng: city.lon};
        var marker = new google.maps.Marker({
              position: cityLatlng,
              map: map,
              title: city.city,
              icon: icon
            });

<<<<<<< HEAD

        var triangleCoords = [
          {lat: 25.774, lng: -80.19},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757}
        ];

        var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});

        google.maps.event.addListener(map, 'click', function(e) {
          var resultColor =
              google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?
              'red' :
              'green';

          new google.maps.Marker({
            position: e.latLng,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: resultColor,
              fillOpacity: .2,
              strokeColor: 'white',
              strokeWeight: .5,
              scale: 10
            }
          });
        });

    //     var infoWindow = new google.maps.InfoWindow({
    //         content: city.city + ", " + city.state + " " 
    //     });

    //     google.maps.event.addListener(marker, 'click', function(){
    //         infoWindow.open(map, marker);

    //     });
    //     markers.push(marker);
    // }

    // $scope.triggerClick = function(index){
    //     google.maps.event.trigger(markers[index],'click');
    //     map.setCenter(markers[index].position);
    // }

    // $scope.cities = cities;
    // for (var i = 0; i < $scope.cities.length; i++) {
    //     createMarker($scope.cities[i]);
    // }
console.log(map.getBounds());
    
});

// // LONGITUDE -180 to + 180
// function generateRandomLong() {
//     var num = (Math.random()*180).toFixed(3);
//     var posorneg = Math.floor(Math.random());
//     if (posorneg == 0) {
//         num = num * -1;
//     }
//     return num;
// }
// // LATITUDE -90 to +90
// function generateRandomLat() {
//     var num = (Math.random()*90).toFixed(3);
//     var posorneg = Math.floor(Math.random());
//     if (posorneg == 0) {
//         num = num * -1;
//     }
//     return num;
// }
=======
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h4>' + city.city + ", " + city.state + '</h4>');
            infoWindow.open(map, marker);

        });
        markers.push(marker);
    }

    $scope.triggerClick = function(index){
        google.maps.event.trigger(markers[index],'click');
        map.setCenter(markers[index].position);
    }

    $scope.cities = cities;
    for (var i = 0; i < $scope.cities.length; i++) {
        createMarker($scope.cities[i]);
    }

    $scope.updateMarkers = function(){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        for (var i = 0; i < $scope.filteredCities.length; i++) {
            createMarker($scope.filteredCities[i]);
        }   
    }

    $scope.getDirections = function(orig, dest){
        var origin = new google.maps.LatLng(orig.lat, orig.lon);
        var destination = new google.maps.LatLng(dest.lat, dest.lon);
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('list-window'));
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    $scope.newSearch = function(){
        var bounds = map.getBounds();
        var center = bounds.getCenter();
        var ne = bounds.getNorthEast(); 
        var centerLoc = new google.maps.LatLng(center.lat(), center.lng());
        // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
        var lat1 = center.lat() / 57.2958; 
        var lon1 = center.lng() / 57.2958;
        var lat2 = ne.lat() / 57.2958;
        var lon2 = ne.lng() / 57.2958;
        // distance = circle radius from center to Northeast corner of bounds 3963 is the radius of the earth in statute miles
        var dis = 3963.0 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
        var met = dis * 1609.34;
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        console.log(met);
            service.nearbySearch({
              location: centerLoc,
              radius: met,
              keyword: $scope.userSearch
        }, callback);

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createPOI(results[i]);
              }
            }
          }

        function createPOI(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
            bounds.extend(marker.getPosition());
        }
    }

    $scope.zoomToCity = function(lat, lon){
        var bounds = new google.maps.LatLngBounds();
        var cityZoom = new google.maps.LatLng(lat, lon);
        map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 12,
            center: cityZoom
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: cityZoom,
              radius: 1000,
              keyword: $scope.userSearch
        }, callback);

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createPOI(results[i]);
              }
            }
          }

        function createPOI(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
            bounds.extend(marker.getPosition());
        }

        // map.fitBounds();
    }

});

>>>>>>> origin/master
