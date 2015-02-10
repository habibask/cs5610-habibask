
function createDialogue() {
    var msg = $("<div title='Hi!!!!'>You are seeing a dialogue box created with jQuery :)</p></div>");
    $(msg).dialog({
        modal:true,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}