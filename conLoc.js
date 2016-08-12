var myApp = angular.module('conLocApp',[]);
myApp.controller('conLocController', function($scope, $http) {

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 24.886, lng: -70.269},
          zoom: 5,
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

});
