var myApp = angular.module('cityApp',[]);
myApp.controller('cityController', function($scope, $http) {

    var myLatlng = {lat: 40.000, lng: -98.000};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatlng,
      mapTypeId: 'terrain'
    });
    var markers = [];
    var apiKey = 'AIzaSyDU6EmqpUmvTiwjIZDIayOrd0Kev8Y2WxM';
    var elevator = new google.maps.ElevationService;


    function createMarker(city){
        var cityLatlng = {lat: city.lat, lng: city.lon};
        var marker = new google.maps.Marker({
              position: cityLatlng,
              map: map,
              title: city.city
            });


 
        // var elevationurl = 'https://maps.googleapis.com/maps/api/elevation/json?locations=' + city.lat + ',' + city.lon + '&key=AIzaSyDU6EmqpUmvTiwjIZDIayOrd0Kev8Y2WxM';

  

        // elevator.getElevationForLocations({'locations': [cityLatlng]}, function(results, status){
        //         if(status === 'OK'){
        //             if(results[0]){
        //                 'The Elevation is: ' +results[0].elevation.toFixed(3) + ' Km!';
        //             }else{
        //                 "Sorry, no elevation results found!";
        //             }
        //         }else{
        //             "Elevation service failed due to: " + status;
        //         }
        //     });

        var infoWindow = new google.maps.InfoWindow({
            content: city.city + ", " + city.state + " " 
        });

        google.maps.event.addListener(marker, 'click', function(){
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
});
