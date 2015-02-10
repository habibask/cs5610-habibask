var posx = 100;

function addSticky() {
    $(function () {
        console.log("success");
        
        var data = $("<div contenteditable='true' class='panel panel-primary sticky'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>");
        data
            .draggable()
    .css({
        "color": "blue",
        "position": "absolute",
        "left":posx,
        "right":100
    });
        posx = posx + 50;
        $(".main2").append(data);
        $(".sticky").draggable();
        $(".sticky").resizable();
    });
}