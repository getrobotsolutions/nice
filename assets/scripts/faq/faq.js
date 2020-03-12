
function LanguageChange(lang)
{
    if(lang === "english")
    {
        eraseCookie("Spanish");
        writeCookie("CurrentLanguage", "English", 30);
        document.getElementById("btn_english").style.backgroundColor = "white";
        document.getElementById("btn_english").style.color = "#FF6600";
        document.getElementById("btn_spanish").style.backgroundColor = "#FF6600";
        document.getElementById("btn_spanish").style.color = "white";
    }
    else if (lang === "spanish")
    {
        eraseCookie("English");
        writeCookie("CurrentLanguage", "Spanish", 30);
        document.getElementById("btn_english").style.backgroundColor = "#FF6600";
        document.getElementById("btn_english").style.color = "white";
        document.getElementById("btn_spanish").style.backgroundColor = "white";
        document.getElementById("btn_spanish").style.color = "#FF6600";
    }
    location.reload();
}

function ShowMapDetails(src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button" onclick="closePopup()">Close</a><div class="dialog-content"><div id="dialog-message"><img src="'+src+'"" width="" style="min-width:500px;max-width:900px;max-height:1600px;"></div></div>';
}


$(document).ready(function(){

    $('a.button').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });
    $(".question-box").click(function () {
        var temp=$(this).children('.answer').text();
        ShowAnswer(temp);
    });

    $("#btn").click(function () {
        ShowPopup($("#btn").attr('dir'));

        //$("$list1").show();

    });
    $(".panel-body #map").click(function () {
        //PlaySpeech("With your phone, take a picture of the map, this way you’ll have the directions on your phone and you can take the map with you.");
        ShowMapDetails($(this).attr('src'));

    });

});


function ShowPopup(src){

    // get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    if (src=="") {
        document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="images/offers/404.png"/></div></div>';
    }
    else{
        document.getElementById('dialog-box').innerHTML = '<a href="#" class="button" style="float: left;position:  relative;top: 20px;">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="'+ src +'"/></div></div>';
        //$("#dialog-box").append('<div class="dialog-content"><div id="dialog-message">'+ message +'</div><a href="#" class="button">Close</a></div>');
    }
}

function ShowPopupARS(src){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="'+ src +'"/></div></div>';
}
function ShowAnswer(attr){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><p>"'+ attr +'"<p/></div></div>';
}

    var field;
    $(document).ready(function(){

        
        $('.collapse').collapse();// Collapse all but the first row on the page.

        $('.panel-heading').click(function(){
            $('.panel-collapse').not(this).collapse("hide");// Collapse one and close others
        });

        // This section makes the search work.
        (function() {
            var searchTerm, panelContainerId, error;
            $('#accordion_search_bar').on('change keyup paste click', function() {
                searchTerm = $(this).val();
                $('#accordion > .panel').each(function() {
                    panelContainerId = '#' + $(this).attr('id');

                    // Makes search to be case insesitive
                    $.extend($.expr[':'], {
                        'contains': function(elem, i, match, array) {
                            return (elem.textContent || elem.innerText || '').toLowerCase()
                                .indexOf((match[3] || "").toLowerCase()) >= 0;
                        }
                    });

                    // END Makes search to be case insesitive

                    // Show and Hide Triggers
                    $(panelContainerId + ':not(:contains(' + searchTerm + '))').hide(); //Hide the rows that done contain the search query.
                    $(panelContainerId + ':contains(' + searchTerm + ')').show();//Show the rows that do!

                });

            });

        }());


    // End Show and Hide Triggers

    // END This section makes the search work

    });

    /* Keyboard layout */
    $(function(){
        $('input[type="text"], input[type="email"], input[type="search"]').keyboard({
            // keep any changes
            usePreview: true, // disabled for contenteditable
            autoAccept: true,
            display: {
                'accept' : 'Search'
            },
            layout: 'custom',
            customLayout: {
                'normal': [
                    ' ',
                    ' q w e r t y u i o p {bksp}',
                    'a s d f g h j k l _',
                    ' z x c v b n m ',
                    ' {space} {accept} '
                ],
                'shift': [
                    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                    '{tab} Q W E R T Y U I O P { } |',
                    'A S D F G H J K L : " {enter}',
                    '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                    '{accept} {space} {left} {right} {sp:.2} {del} {toggle}'
                ]
            }
        });
    });