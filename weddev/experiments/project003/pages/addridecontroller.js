app.controller("addridecontroller", function ($scope, $http, $location,LoginService) {

    var map;
    // google.maps.event.addDomListener(window, 'load', initialize);

    $(document).on('click', '.show', function (e) {
        e.preventDefault();
        calculateRoute();
    });

    var directionDisplay,
        directionsService = new google.maps.DirectionsService(),
        map;

    var mapCanvas = document.getElementById('map_canvas');
    //
    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
        center: new google.maps.LatLng(42.3601, -71.0589),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions)
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directions"));
    console.log(directionDisplay);


    function calculateRoute() {
        var start = $("#from").val(),
            end = $("#to").val();

        if (start == '' || end == '') {
            // cannot calculate route
            $("#results").hide();
            return;
        }
        else {
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode['DRIVING']
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    console.log(response);
                    $(".expand").show();
                }
                else {
                    $(".expand").hide();
                    $("#results").hide();

                }
            });

        }
    }

    $scope.expand = function () {
        console.log("inside expand");
        if ($("#results").css('display') == 'none') {
            $("#results").show();
            $(".expand").attr('value', '- Collapse');

        } else {
            $("#results").hide();
            $(".expand").attr('value', '+ Expand');


        }
    }

    var fieldsRequired = ['source', 'destination', 'personcount', 'proximity', 'cost']

    $scope.insertRideInfo = function (ride) {


        for (var field in fieldsRequired) {
            $("." + fieldsRequired[field]).css({
                'box-shadow': 'none',
                'outline': 'none',
                'border-color': 'none'
            });
        }
        var fieldsEntered = [];
        $scope.addridefail = '';
        if (ride == null) {
            console.log("inside insertrideinfo nulll");

            $scope.addridefail = "You cannot escape from entering the form"
            for (var field in fieldsRequired) {
                $("." + fieldsRequired[field]).css({
                    'box-shadow': '0 0 10px crimson',
                    'outline': 'none',
                    'border-color': '#9ecaed'
                });
            }
        } else {
            //get all the fields that are entered
            for (var field in ride) {

                if (ride.hasOwnProperty(field)) {

                    var message = ride[field];
                    if ($.trim(message) != '') {
                        fieldsEntered.push(field);
                    }
                }
            }
            //get all the fields that are not entered
            var unenteredFields = fieldsRequired.filter(function (el) {
                return (fieldsEntered.indexOf(el) < 0 );
            });

            if (unenteredFields.length != 0) {

                $scope.addridefail = "Fields ";

                //add focus and show the field in the message regfail
                for (var field in unenteredFields) {
                    $("." + unenteredFields[field]).css({
                        'box-shadow': '0 0 10px crimson',
                        'outline': 'none',
                        'border-color': '#9ecaed'
                    });
                    $scope.addridefail += unenteredFields[field] + ", ";

                }
                $scope.addridefail += "are to be entered";
            }

           

            //If all the fields are entered then send the object to Service to add
            if (unenteredFields.length == 0 && $scope.addridefail == '') {
                console.log("display of results property " + $("#results").css('display'))
                if ($("#results").css('display') == 'none') {
                    $scope.addridefail = "Source or destination doesnot exist!!";
                } else {

                    $scope.addridefail = '';
                    LoginService.addRide(ride, function (res) {
                        console.log("Add ride Error forwared to Router js");
                        //Set any errors sent from service to the regfail
                        $scope.addridefail = res;
                    });
                }
            }
        };
    };

});