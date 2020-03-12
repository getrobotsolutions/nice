var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
//recognition.lang = "es-MX";
var question;

var ans_obj = new Array();
var failSafeFlag = 0;
var notSureFlag = false;
var dontKnowFlag = false;
var speech;


function listen() {
    recognition.start();
}


recognition.onresult = function (event) {

    var txt = event.results[event.results.length - 1][0].transcript;
    var txt1 = event.results[event.resultIndex];
    question = txt;

    if(txt1.isFinal){
        recognition.stop();
        event.preventDefault();
        console.log("making a ajax call");
        $.ajax({
            type: "POST",
            data: { question: txt},
            url: "/"
        }).done(function (result) {

            //console.log('Bot returned: ' + result);
            ans_obj = normalize(JSON.parse(result));
            //console.log(ans_obj);
            if(ans_obj[0].score > 50 && ans_obj[0].score < 55 )
            {
                notSureFlag = true;
            }
            else if(ans_obj[0].score < 50)
            {
                dontKnowFlag = true
            }
            else
            {
                notSureFlag = false;
                dontKnowFlag = false;
            }
            botAnswer(0);
        });
    }
    document.getElementById('listen_txt').innerText = txt;
    console.log(txt);
};


function botListening() {
    PlaySpeech(" ");
    listen();
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var dialogTop =  '30%';
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft, background:'#eee'}).show();
    document.getElementById('dialog-box').innerHTML = '<div class="cortana"><div class="blue"></div><div class="teal"></div></div>\n' +
        '<div class="dialog-content" style="height:500px"><div id="dialog-message" style="text-align: center">' +
        '<p id="listen_txt" style="font-size:47px;color:#da662e; padding-top: 90px">Ask a Question Now!</p></div>' +
        '</div><div style="width:100%; background:#da662e; height:100px; font-size:66px; text-align: center">Listening...</div>';
}


function botAnswer(number) {
    $('#dialog-box').hide();
    $('#dialog-overlay').hide();
    console.log(ans_obj);
    sendToLogs(ans_obj, question);
    var map_path;
    var flag = false;
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    var dialogTop =  '30%';
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft, background:'#eee'}).show();
    switch ((ans_obj[number].answer).toLowerCase()) {
        case "treasurer's office":
            flag = true;
            map_path = "/assets/images/maps/O-County-Treasurer.png";
            speech = "Please go to the Treasurer's Office, here's how to get there.";
            break;
        case "sheriff's office":
            flag = true;
            map_path = "/assets/images/maps/O-Sheriff.png";
            speech = "Please go to the Sheriff's Office, here's how to get there.";
            break;
        case "please follow the map to reach sheriff's department":
            flag = true;
            map_path = "/assets/images/maps/O-Sheriff.png";
            speech = "please follow the map to reach sheriff's department";
            break;
        case "fiscal sevices":
            flag = true;
            map_path = "/assets/images/maps/O-Fiscal-Services-Updated.png";
            speech = "Please go to Fiscal Services, here's how to get there.";
            break;
        case "for invoice questions, please go to fiscal sevices, here's how to get there.":
            flag = true;
            map_path = "/assets/images/maps/O-Fiscal-Services-Updated.png";
            speech = "for invoice questions, please go to fiscal sevices, here's how to get there.";
            break;
        case "equalization":
            flag = true;
            map_path = "/assets/images/maps/O-Equalization.png";
            speech = "Please go to the Equalization office, here's how to get there.";
            break;
        case "the parks and recreation office":
            flag = true;
            map_path = "/assets/images/maps/O-Parks-&-Recreation.png";
            speech = "You can purchase permits at the Parks and Recreation Office, here is how to get there.";
            break;
        case "please follow the map to reach parks department":
            flag = true;
            map_path = "/assets/images/maps/O-Parks-&-Recreation.png";
            speech = "Please follow the map to reach Parks Department";
            break;
        case "you can purchase permits at the parks and recreation office, here is how to get there.":
            flag = true;
            map_path = "/assets/images/maps/O-Parks-&-Recreation.png";
            speech = "you can purchase permits at the parks and recreation office, here is how to get there.";
            break;
        case "gis":
            flag = true;
            map_path = "/assets/images/maps/O-GIS.png";
            speech = "please go to the G.I.S. office, here's how to get there.";
            break;
        case "clerk/register of deeds office":
            flag = true;
            map_path = "/assets/images/maps/o-Register-of-Deeds.png";
            speech = "Please go to the Clerk Register of Deeds office, here's how to get there.";
            break;
        case "visit the clerk/register of deeds office":
            flag = true;
            map_path = "/assets/images/maps/o-Register-of-Deeds.png";
            speech = "Please go to the Clerk Register of Deeds office, here's how to get there.";
            break;
        case "human resources":
            flag = true;
            map_path = "/assets/images/maps/O-Human-Resources.png";
            speech = "Please visit Human Resources, here's how to get there.";
            break;
        case "visit the employee portal or human resources":
            flag = true;
            map_path = "/assets/images/maps/O-Human-Resources.png";
            speech = "please visit the Employee Portal on the web, or visit Human Resources.  Here's how to get to Human Resources.";
            break;
        case "visit human resources":
            flag = true;
            map_path = "/assets/images/maps/O-Human-Resources.png";
            speech = "Please visit Human Resources, here's how to get there.";
            break;
        case "visit miottawa.org/departments/hr/ or stop by human resources":
            flag = true;
            map_path = "/assets/images/maps/O-Human-Resources.png";
            speech = "please visit miottawa.org/Departments/HR/ or stop by Human Resources.  Here's how to get to Human Resources.";
            break;
        case "stop by human resources to check in":
            flag = true;
            map_path = "/assets/images/maps/O-Human-Resources.png";
            speech = "please stop by Human Resources to check in, here's how to get to there.";
            break;
        case "locations vary so check with the msu extension office.":
            flag = true;
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            speech = "Locations for meetings vary so check with the MSU Extension Office, here's how to get to the MSU Extension office.";
            break;
        case "yes. please go to msu extension.":
            flag = true;
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            speech = "Yes. Please go to MSU Extension office, here's how to get to there.";
            break;
        case "yes, visit msu extension":
            flag = true;
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            speech = "please visit the MSU Extension office, here's how to get there.";
            break;
        case "yes at the msu extension office or through the mus bookstore at bookstore.msue.msu.edu":
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            speech = "Yes, through the MSU bookstore at bookstore.msue.msu.edu or at the MSU Extension Office, here's how to get to the MSU office.";
            break;
        case "msu extension has a list of current clubs available in our office":
            flag = true;
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            speech = "To find a 4-H club for a child, the MSU Extension office has a list of current clubs, here's how to get to the office.";
            break;
        case "go to http://msue.anr.msu.edu/events or the msu extension office":
            speech = "To register for a MSU Extension event, please go to http://msue.anr.msu.edu/events or go to the MSU Extension Office; here's how to get there.";
            flag = true;
            map_path = "/assets/images/maps/O-MSU-Extension.png";
            break;
        case "contact ben savoie, district forester at the ottawa conservation district, 616-842-5852 ext. 5.":
            speech = "For tree problems, please contact Ben Savoie, District Forester at the Ottawa Conservation District, 616-842-5852 ext. 5.";
            break;
        case "water resources commissioner's office":
            flag = true;
            map_path = "/assets/images/maps/O-Water-Resources-Commissioner.png";
            speech = "please visit the Water Resources Commissioner's Office, here's how to get there.";
            break;
        case "water resources commissioner's office or miottawa.org/departments/drain":
            flag = true;
            map_path = "/assets/images/maps/O-Water-Resources-Commissioner.png";
            speech = "please go to miottawa.org/Departments/Drain, or go to the Water Resources Commissioner's Office; here's how to get there.";
            break;
        case "please follow the map for board room":
            flag = true;
            map_path ="/assets/images/maps/O-Board-Room.png";
            speech = "Please follow the map for Board Room";
            break;
        case "please follow the map for county administrator's office.":
            flag = true;
            map_path ="/assets/images/maps/O-County Administrator.png";
            speech = "Please follow the map for County Administrator's office.";
            break;
        case "please follow the map for conference room a":
            flag = true;
            map_path ="/assets/images/maps/O-Conference-Room-A.png";
            speech = "Please follow the map for Conference room A";
            break;
        case "please follow the map for conference room b":
            flag = true;
            map_path ="/assets/images/maps/O-Conference-Room-B.png";
            speech = "Please follow the map for Conference room B";
            break;
        case "please follow the map for conference room c":
            flag = true;
            map_path ="/assets/images/maps/O-Conference-Room-C.png";
            speech = "Please follow the map for Conference room C";
            break;
        case "please follow the map for conference room d":
            flag = true;
            map_path ="/assets/images/maps/O-Conference-Room-D.png";
            speech = "Please follow the map for Conference room D";
            break;
        case "please follow the map for it department":
            flag = true;
            map_path ="/assets/images/maps/O-IT.png";
            speech = "Please follow the map for IT department";
            break;
        case "please follow the map for fiscal services":
            flag = true;
            map_path ="assets/images/maps/O-Fiscal-Services-Updated.png";
            speech = "Please follow the map for Fiscal Services";
            break;
        case "please follow the map for corporate counsel":
            flag = true;
            map_path ="/assets/images/maps/O-Corporate-Counsel.png";
            speech = "Please follow the map for Corporate Counsel";
            break;
        case "please follow the map for conference room f":
            flag = true;
            map_path ="assets/images/maps/O-Conference-Room-F.png";
            speech = "Please follow the map for Conference room F";
            break;
        case "please follow the map for main conference room":
            flag = true;
            map_path ="assets/images/maps/O-Main-Conference-Room.png";
            speech = "Please follow the map for Main Conference room";
            break;
        case "please follow the map for innovation room":
            flag = true;
            map_path ="/assets/images/maps/O-Innovation-Room.png";
            speech = "Please follow the map for Innovation room";
            break;
        case "please follow the map for county treasurer":
            flag = true;
            map_path ="/assets/images/maps/O-County-Treasurer.png";
            speech = "Please follow the map for County Treasurer";
            break;
        case "please follow the map for facilities maintenance":
            flag = true;
            map_path ="/assets/images/maps/maps/O-Facilities Maintenance.png";
            speech = "Please follow the map for Facilities Maintenance";
            break;
        case "please follow the map for conference room e":
            flag = true;
            map_path ="/assets/images/maps/maps/O-Conference-Room-E.png";
            speech = "Please follow the map for Conference room E";
            break;
        case "please follow the map for emergency management office":
            flag = true;
            map_path ="/assets/images/maps/maps/O-Emergency Management.png";
            speech = "Please follow the map for Emergency Management Office";
            break;
        case "please follow the map for county register office":
            flag = true;
            map_path ="/assets/images/maps/o-Register-of-Deeds.png";
            speech = "Please follow the map for County Register office";
            break;
        case "please follow the map for break room":
            flag = true;
            map_path ="/assets/images/maps/maps/O-Break-Room.png";
            speech = "Please follow the map for Break room";
            break;
        case "please follow the map for planning and performance":
            flag = true;
            map_path = "/assets/images/maps/maps/O-Planning & Performance Improvement.png";
            speech = "Please follow the map for Planning and Performance";
            break;
        case "please follow the map for restroom":
            flag = true;
            map_path ="/assets/images/maps/restroom.png";
            speech = "Please follow the map for Restroom";
            break;
        case "to meet with al vanderberg, please go to the county administrator's office. here's how to get there.":
            flag = true;
            map_path ="/assets/images/maps/O-County Administrator.png";
            speech = "To meet with Al Vanderberg, please go to the County Administrator's office. Here's how to get there.";
            break;
        case "to meet with misty cunningham, please go to the county administrator's office. here's how to get there.":
            flag = true;
            map_path ="/assets/images/maps/O-County Administrator.png";
            speech = "To meet with Misty Cunningham, please go to the County Administrator's office. Here's how to get there.";
            break;
        case "please follow the map for it computer training room":
            flag = true;
            map_path = "/assets/images/maps/lower-level/O-IT-Computer-Training.png";
            speech="Please follow the map for IT Computer Training Room.";
            break;
        case "the board of commissioners meeting is held in the board room.":
            flag = true;
            map_path = "/assets/images/maps/O-Board-Room.png";
            speech = "The Board of Commissioners meeting is held in the Board Room.";
            break;
        case "here's a map to the water commissioner's office.":
            flag=true;
            map_path = "/assets/images/maps/O-Water-Resources-Commissioner.png";
            speech = "Here's a map to the Water Commissioner's office.";
            break;
        case "following is the list of departments in this building.":
            PlaySpeech("Following is the list of departments in this building.");
            navigateTo("departments");
            break;
        case "no good match found in kb.":
            number = -1;
            failSafeFlag +=1;
            break;
        case "ottawa county does not serve civil papers. you may wish to use a private company.":
            speech = "Ottawa County does not serve civil papers. You may wish to use a private company.";
            break;
        case "the prosecutor's office at the ottawa county courthouse, 414 washington ave, room 120 grand haven, mi 49417":
            speech = "To get a PPO, a personal protection order, please go to The Prosecutor's Office at the Ottawa County Courthouse, 414 Washington Ave, Room 120 Grand Haven, MI 49417";
            break;
        case "go to miottawa.org/foia/loadpubliclogin.action or for police/accident /criminal /law enforcement report requests go to the sheriff's office, for all other requests go to corporation counsel.":
            speech ="To file a freedom of information act request, please follow the instructions on my screen.";
            break;
        default:
            flag = false;
            speech = ans_obj[number].answer;
            break;
    }

    if(dontKnowFlag === true)
    {
        if(failSafeFlag >= 2){
            failSafeFlag =0;
            PlaySpeech("Sorry! I am still learning, please look for your answer in F AQ list");
            location.href = "/faq";
        }
        else {
            PlaySpeech("Sorry! I am still learning, please try asking a different question or check my F AQ page.");
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> ' +
                '<p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">Sorry! I am still learning, please try asking a different question or check my FAQ page.</p></div>' +
                '</div>';
            failSafeFlag +=1;
        }
    }
    else if(number === -1){
        if(failSafeFlag >= 2){
            failSafeFlag = 0;
            PlaySpeech("Sorry! I am still learning, please look for your answer in F AQ list");
            location.href = "/faq";
        }
        else
        {
            PlaySpeech("Sorry! I am still learning, please try again or check my FAQ List");
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">Sorry could not understand, please try again.</p></div>' +
                '</div>';
        }
    }
    else if(number === 0)
    {
        failSafeFlag = 0;
        if(notSureFlag === true){
            PlaySpeech("I am not sure if this is what you looking for. " + speech);
        }
        else{
            PlaySpeech(speech);
        }


        if (flag === true)
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<img style="min-width:500px;max-width:800px;max-height:1600px;" src="'+ map_path +'"> <p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[0].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px; padding: 20px ">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(1)">• '+ans_obj[1].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(2)">• '+ans_obj[2].question+' (Tap here to see more)</p>' +
                '</div>';

        }
        else
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[0].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px; padding: 20px ">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(1)">• '+ans_obj[1].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(2)">• '+ans_obj[2].question+' (Tap here to see more)</p>' +
                '</div>';
        }
    }
    else if(number === 1)
    {
        failSafeFlag = 0;
        if(notSureFlag === true){
            PlaySpeech("I am not sure if this is what you looking for. " + speech);
        }
        else{
            PlaySpeech(speech);
        }
        if (flag === true)
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<img style="min-width:500px;max-width:800px;max-height:1600px;" src="'+ map_path +'"> <p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[1].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px; padding: 20px ">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(2)">• '+ans_obj[2].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(0)">• '+ans_obj[0].question+' (Tap here to see more)</p>' +
                '</div>';

        }
        else
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[1].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px; padding: 20px ">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(2)">• '+ans_obj[2].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(0)">• '+ans_obj[0].question+' (Tap here to see more)</p>' +
                '</div>';
        }
    }
    else
    {
        failSafeFlag = 0;
        if(notSureFlag === true){
            PlaySpeech("I am not sure if this is what you looking for. " + speech);
        }
        else{
            PlaySpeech(speech);
        }
        if (flag === true)
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<img style="min-width:500px;max-width:800px;max-height:1600px;" src="'+ map_path +'"> <p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[2].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px; padding: 20px ">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(0)">• '+ans_obj[0].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(1)">• '+ans_obj[1].question+' (Tap here to see more)</p>' +
                '</div>';

        }
        else
        {
            document.getElementById('dialog-box').innerHTML = '\n' +
                '<div class="dialog-content" style="min-height:500px"><div id="dialog-message" style="text-align: center">' +
                '<div style="height: 40px; width: 100%; text-align: right;"><button onclick="closePopup()" style="background:#e60000;color: white;width:80px;height:40px;font-size:20px;border-radius:5px;">CLOSE</button></div> '+
                '<p id="answer_txt" style="font-size:47px;color:#da662e; padding-top: 10px">' + ans_obj[2].answer +'</p></div>' +
                '</div><div style="width:100%; background:#da662e;  font-size:26px ; padding: 20px">' +
                '<p style="font-size: 40px;"> Looking for Something else?</p>' +
                '<p onclick="botAnswer(0)">• '+ans_obj[0].question+' (Tap here to see more)</p>' +
                '<p onclick="botAnswer(1)">• '+ans_obj[1].question+' (Tap here to see more)</p>' +
                '</div>';
        }

    }

}


function normalize(result) {
    var botResponse = new Array();
    for(var i = 0; i < 3; i++)
    {
        botResponse[i] = {'question': '', 'answer': '', 'score': ''}
    }
    for(var i = 0; i < result.length; i++)
    {
        var question = result[i].questions[0].replace(' i ', ' I ');
        botResponse[i] = {'question': question.replace(question[0], question[0].toUpperCase()), 'answer': result[i].answer, 'score': result[i].score}
    }
    //console.log(botResponse);
    return botResponse;
}

function acall() {
    console.log("making a ajax call");
    $.ajax({
        type: "POST",
        data: { question: "dog license"},
        url: "/"
    }).done(function (result) {
        $('#dialog-box').hide();
        //console.log('Bot returned: ' + result);
        normalize(JSON.parse(result));

    });
}


$('#dialog-overlay').click(function () {
   closePopup();
});

function closePopup() {
    $('#dialog-overlay').hide();
    $('#dialog-box').hide();
    recognition.stop();
}


function sendToLogs(ansObj, question) {

    var q1 = ansObj[0].question;
    var a1 = (ansObj[0].answer).replace(/[^a-zA-Z ]/g, "");
    var s1 = ansObj[0].score;
    var q2 = ansObj[1].question;
    var a2 = (ansObj[1].answer).replace(/[^a-zA-Z ]/g, "");
    var s2 = ansObj[1].score;
    var q3 = ansObj[2].question;
    var a3 = (ansObj[2].answer).replace(/[^a-zA-Z ]/g, "");
    var s3 = ansObj[2].score;


    var dataString = {'question': question, 'q1':q1, 'a1':a1, 's1':s1, 'q2':q2, 'a2':a2, 's2':s2, 'q3':q3, 'a3':a3, 's3':s3};

    $.ajax({
        url: "https://robotaisolutions.com/dashboard/logServer.php",
        type: "post",
        data: dataString,

        success: function (data) {
            //alert(data);
            console.log(data);
        }
    });
}