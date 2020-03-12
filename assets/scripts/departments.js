$(document).ready(function(){
    //PlaySpeech("With your phone, take a picture of the map, this way you’ll have the directions on your phone and you can take the map with you.");

    $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });

    $("#btn").click(function () {
        ShowPopup($("#btn").attr('dir'));

        //$("$list1").show();

    });
    $("#mapBtn").click(function () {
        ShowPopup($("#mapBtn").attr('dir'));

        //$("$list1").show();

    });

    $(".department-box").click(function () {
        //PlaySpeech("With your phone, take a picture of the map, this way you’ll have the directions on your phone and you can take the map with you.");
        ShowMapDetails($(this).children().text(), $(this).attr('name'));

        //$("$list1").show();

    });
});


function ShowMapDetails( dept_details, map_src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '20%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button" onclick="closePopup()">Close</a><div class="dialog-content"><div id="dialog-message"><p>'+ dept_details +'<p/><img src='+map_src+' width="" style="min-width:500px;max-width:900px;max-height:1700px;"></div></div>';
}