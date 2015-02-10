$(function () {
        console.log("success");
        var acc = $("#data1").accordion();
        var tabs = $("#data2").tabs();
        $("#containerfordata1").append(acc);
        $("#containerfordata2").append(tabs);
});