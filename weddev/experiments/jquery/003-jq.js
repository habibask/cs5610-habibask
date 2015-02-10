function applyEffects() {
    $(function () {
        $(".img1").effect("shake", 1000,previousImage());
        $(".img2").effect("slide", 1000,previousImage());
        $(".img3").effect("puff", 1000,previousImage());
        $(".img4").effect("explode", 1000,previousImage());
        console.log("success");
    });
}
function previousImage() {
    setTimeout(function () {
        $("img").removeAttr("style").hide().fadeIn();
    }, 1000);
};