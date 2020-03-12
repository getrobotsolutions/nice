$(document).ready(function(){
    PlaySpeech("With your phone, take a picture of the map, this way you’ll have the directions on your phone and you can take the map with you.");

    $('a.button').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });

    $("area, .menu-item").click(function () {
        //PlaySpeech("With your phone, take a picture of the map, this way you’ll have the directions on your phone and you can take the map with you.");
        ShowMapDetails($(this).attr('title'), $(this).attr('src'));

        //$("$list1").show();

    });
    $("#mapBtn").click(function () {
        ShowPopup($("#mapBtn").attr('dir'));

        //$("$list1").show();

    });

    $("#txt01").click(function () {
        $('#upper-level').show();
        $('#lower-level').hide();
    });
    $("#txt02").click(function () {
        $('#lower-level').show();
        $('#upper-level').hide();
    });
});


function ShowPopup(src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '20%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<p style="width:  70%;display:  block;float:  left;font-size: 29px;padding: 20px;">Take Picture and Show merchant</p><a href="#" class="button" style="float: left;position:  relative;top: 20px;">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800"  src="'+ src +'"/></div></div>';
        //$("#dialog-box").append('<div class="dialog-content"><div id="dialog-message">'+ message +'</div><a href="#" class="button">Close</a></div>');
}

function ShowMapDetails(attr, src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button" onclick="closePopup()">Close</a><div class="dialog-content"><div id="dialog-message"><p>'+ attr +'<p/><img src='+src+' width="" style="min-width:500px;max-width:900px;max-height:1600px;"></div></div>';
}