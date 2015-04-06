
app.controller("profilecontroller", function ($scope, $sce, $http, $location, LoginService) {

    $(".tabs-menu a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        if (tab == '#tab-2') {
            var rides = LoginService.getRides(function (res) {
                console.log("Inside getrides in controller");
                console.log(res);
                $scope.rides = res;
            });
        }
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();

    });

    //Update User Information
    $scope.updateInfo = function (user) {
        console.log(user);
        LoginService.update(user, function (res) {
            if (res == 'success') {
                $('#savebutton2').css({
                    'display': 'none'
                });
            }
        });
    };

    $scope.updateText = function (user) {
        user.personalmessage = $('#personalmsgpara').text();
        user.personalinterests = $('#personalinterestspara').text();
        console.log(user);
        LoginService.update(user, function (res) {
            if (res == 'success') {
                $('#savebutton1').css({
                    'display': 'none'
                });
            }
        });

    };

    $('#personalmsg').click(function () {
        $('#personalmsgpara').attr('contenteditable', 'true')
            .css({
                'color': 'gray',
                'font-family': 'arial',
                'border': '1px solid white'
            }).focus();;
        $('#personalmsg').css({
            'display': 'none'
        });
        $('#okbutton1').css({
            'display': 'inline-block'
        });
    });

    $scope.doneEditing1 = function () {
        $('#personalmsgpara')
            .attr('contenteditable', 'false')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#personalmsg').css({
            'display': 'inline-block'
        });
        $('#okbutton1').css({
            'display': 'none'
        });
        $scope.personalmessage = $('#personalmsgpara').text();
        console.log($scope.personalmessage);
        if ($scope.personalmessage != $scope.currentUser.personalmessage) {
            $('#savebutton').css({
                'display': 'inline-block'
            });
        } else {
            $('#savebutton').css({
                'display': 'none'
            });
        }
    }

    //For the interests

    $('#interests').click(function () {
        $('#personalinterestspara').attr('contenteditable', 'true')
            .css({
                'color': 'gray',
                'font-family': 'arial',
                'border': '1px solid white'
            }).focus();
        $('#interests').css({
            'display': 'none'
        });
        $('#okbutton2').css({
            'display': 'inline-block'
        });
    });

    $scope.doneEditing2 = function () {
        $('#personalinterestspara')
            .attr('contenteditable', 'false')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            }).focus();;
        $('#interests').css({
            'display': 'inline-block'
        });
        $('#okbutton2').css({
            'display': 'none'
        });
        $scope.personalmessage = $('#personalinterestspara').text();
        if ($scope.personalmessage != $scope.currentUser.personalmessage) {
            $('#savebutton2').css({
                'display': 'inline-block'
            });
        } else {
            $('#savebutton2').css({
                'display': 'none'
            });
        }
    }

    //For the user information
    $('#userinfo').click(function () {
        console.log("inside userinfo click")
        $('#name')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            }).focus();
        $('#username')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#email')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#userinfo').css({
            'display': 'none'
        });
        $('#okbuttonuser').css({
            'display': 'inline-block'
        });
    });

    $scope.edituserinfo = function () {
        $('#name')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#username')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#email')
           .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#userinfo').css({
            'display': 'inline-block'
        });
        $('#okbuttonuser').css({
            'display': 'none'
        });
        $('#savebutton2').css({
            'display': 'inline-block'
        });
    }

    //For the Car information
    $('#carinfo').click(function () {
        console.log("inside carinfo click")
        $('#carnumber')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            }).focus();
        $('#carmodel')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#carcapacity')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#carinfo').css({
            'display': 'none'
        });
        $('#okbuttoncar').css({
            'display': 'inline-block'
        });
    });

    $scope.editcarinfo = function () {
        $('#carnumber')
           .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#carmodel')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#carcapacity')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#carinfo').css({
            'display': 'inline-block'
        });
        $('#okbuttoncar').css({
            'display': 'none'
        });
        $('#savebutton2').css({
            'display': 'inline-block'
        });
    }

    //For the address information
    $('#addressinfo').click(function () {
        console.log("inside addressinfo click")
        $('#address1')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            }).focus();
        $('#address2')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#city')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#state')
            .removeAttr('disabled')
            .css({
                'color': 'black',
                'font-family': 'arial',
                'border': '1px solid white'
            });
        $('#addressinfo').css({
            'display': 'none'
        });
        $('#okbuttonaddress').css({
            'display': 'inline-block'
        });
    });

    $scope.editaddressinfo = function () {
        $('#address1')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#address2')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#city')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#state')
            .attr('disabled', 'disabled')
            .css({
                'color': 'black',
                'font-family': "'Lato', Calibri, Arial, sans-serif"
            });
        $('#addressinfo').css({
            'display': 'inline-block'
        });
        $('#okbuttonaddress').css({
            'display': 'none'
        });
        $('#savebutton2').css({
            'display': 'inline-block'
        });
    }

});