$(function () {
    var map;
    google.maps.event.addDomListener(window, 'load', initialize);

    $(document).on('click', '#submit', function (e) {
        e.preventDefault();
        calculateRoute();
    });

    var directionDisplay,
        directionsService = new google.maps.DirectionsService(),
        map;

    function initialize() {
        var mapCanvas = document.getElementById('map_canvas');
        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
            center: new google.maps.LatLng(42.3601, -71.0589),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(mapCanvas, mapOptions)
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directions"));
    }

    function calculateRoute() {
        var selectedMode = $("#mode").val(),
            start = $("#from").val(),
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
                travelMode: google.maps.DirectionsTravelMode[selectedMode]
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    console.log(response);
                    $("#results").show();
                }
                else {
                    $("#results").hide();
                }
            });

        }
    }
});