app.controller("searchridescontroller", function ($scope, $http, $location, LoginService) {
    $scope.searchRides = function () {

        //retrieve lat long of the entered source
        var geocoder = new google.maps.Geocoder();
        var address = 'allston, MA';//document.getElementById("add").value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var long = results[0].geometry.location.lng();
                console.log("lat - " + lat);
                console.log("long - " + long);
            }
        });

        var resultrides = [];

        LoginService.searchRides(function (res) {

            var poly = [];
            var poly1 = [];

            var myPosition = new google.maps.LatLng(42.3576, -71.1227);
            var cascadiaFault1;
            var directionDisplay,
        directionsService = new google.maps.DirectionsService(),
        map;

            for (var idx in res) {

                var request = {
                    origin: res[idx].source,
                    destination: res[idx].destination,
                    travelMode: google.maps.DirectionsTravelMode['DRIVING']
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        poly1 = response.routes[0].overview_path;

                        poly = new google.maps.Polyline({
                            path: poly1,
                            map: map
                        })
                        if (google.maps.geometry.poly.containsLocation(myPosition, poly, 0.9) == true) {
                            resultrides.push(res[idx]);
                            $scope.resultrides = resultrides;
                            $scope.$apply();
                            console.log($scope.resultrides);
                        }
                        console.log(res[idx].destination + " - value is -" + google.maps.geometry.poly.containsLocation(myPosition, poly, 0.9));

                    }
                    

                });


            }

        });
    }
});