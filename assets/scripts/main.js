$(document).ready(function(){
    console.log("URL is: " + window.location.href);
    if(window.location.href === "http://localhost:3003/"){
        document.getElementById('home').style.display="none";
    }

    ShowTime();
    showWeather();

    dataKey = -1;
    console.log("sending Key:" + dataKey);
    $.ajax({
        type: "GET",
        data: { key: dataKey},
        url: "/api/sendresponse"
    });
    //if(window.location.href !== "http://localhost:3003/faq"){
        autoNavigation();                                       // automatically navigates to screenSaver in 1.15min
    //}



    $('a.btn-ok, #dialog-overlay').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });

    var inter = setInterval(sendRobotTTL, 5000);
    showroboCam();


});


//---------------------------------------Navigation Module--------------------------------------------------------------

function navigateTo(page)
{
    switch (page) {
        case "mainMenu":
            location.href = "/";
            break;
        case "screenSaver":
            location.href = "/screenSaver";
            break;
        case "maps":
            location.href = "/maps";
            break;
        case "departments":
            location.href = "/departments";
            break;
        case "faq":
            location.href = "/faq";
            break;
        case "checkIn":
            location.href = "/checkIn";
            break;

        default:
            console.log("*naviagetTo()* - wrong choice selected");
            break;
    }
}

//----------------------------------------------------------------------------------------------------------------------




//---------------------------------------Date/Time/Weather Module-------------------------------------------------------
function showWeather(){
    var city = "Ottawa County, US";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d6ca94c15ab17256de7e07c8f5395f4a&units=imperial";

    $.getJSON(queryURL,function (data) {

        var temp = Math.round(data.main.temp);
        var condition = data.weather[0].main;
        var loc = 'http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png' ;
        $('#condition').text(condition);
        $('#temp').append(temp + '</strong><sup>°F</sup>');
        $('#image-zoom').attr("src",loc);
        console.log("Weather Showed");
    });
}
//}, 1000);
setInterval(function () {
    //alert();
    ShowTime()
},10000);

function ShowTime()
{
    var dt = new Date();
    //formatAMPM(dt);
    document.getElementById("content_air") .innerHTML = formatAMPM(dt) ;
    document.getElementById("content_date") .innerHTML = formatDate(dt);

}
function formatAMPM(date) {

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var dayName = days[date.getDay()];

    //dayName = date.toString().split(' ')[0];
    hours = hours <10? '0' +hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return dayName + ' ' + hours + ':' + minutes + ' ' + ampm;
}

function formatDate(date){

    var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //var month = m_names[date.getMonth()];
    var month = date.getMonth()+1;
    var day = date.getDate();
    //day = getGetOrdinal(day);

    return (month<10 ? '0' : '') + month + '/' +(day<10 ? '0' : '') + day+'/'+ date.getFullYear() ;
}

//----------------------------------------------------------------------------------------------------------------------



function ShowPopup(){

// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft, background:'#eee'}).show();
    document.getElementById('dialog-box').innerHTML = '<a href="#" class="button">Close</a><div class="dialog-content"><div id="dialog-message"><img width="800" src="/assets/images/general/contact.png"/></div></div>';
}

function closePopup(){
    document.getElementById('dialog-overlay').style.display="none";
    document.getElementById('dialog-box').style.display="none";
}

function autoNavigation() {
    var initial = setInterval(navigateTo,60000, 'screenSaver');
    $(document).click(function(event) {
        clearInterval( initial );
        initial=setInterval(navigateTo,60000,'screenSaver');
    });
}

window.oncontextmenu = function() { return false; }


