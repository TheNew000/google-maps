var myApp = angular.module('monsterApp',[]);
myApp.controller('monsterController', function($scope, $http) {

    $scope.Math = window.Math;
    var myLatlng = {lat: 40.000, lng: -98.000};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: myLatlng,
      mapTypeId: 'terrain'
    });
    var markers = [];
    var apiKey = 'AIzaSyDU6EmqpUmvTiwjIZDIayOrd0Kev8Y2WxM';

    function createMarker(city){
        var cityLatlng = {lat: city.lat, lng: city.lon};
        var marker = new google.maps.Marker({
              position: cityLatlng,
              map: map,
              title: city.city
            });


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
