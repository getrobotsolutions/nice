var callStatusFlag = false;



//------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------


//Create an account on Firebase, and use the credentials they give you in place of the following
var firebaseConfig = {
    apiKey: "AIzaSyBXzcGDkfDK1Pd9IK2SrULFylzdOF6QBkU",
    authDomain: "websitebeaver-6d9c7.firebaseapp.com",
    databaseURL: "https://websitebeaver-6d9c7.firebaseio.com",
    projectId: "websitebeaver-6d9c7",
    storageBucket: "websitebeaver-6d9c7.appspot.com",
    messagingSenderId: "1060779787413",
    appId: "1:1060779787413:web:62cfd5773721b0df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref();
var yourVideo;
var friendsVideo;
var yourId = Math.floor(Math.random()*1000000000);
//Create an account on Viagenie (http://numb.viagenie.ca/), and replace {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'} with the information from your account
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'Watson60!','username': 'manage.ars1@gmail.com'}]};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
pc.onaddstream = (event => friendsVideo.srcObject = event.stream);

function sendMessage(senderId, data) {
    var msg = database.push({ sender: "BOB", message: data });
    msg.remove();
}

function sendRobotTTL() {
    var msg = database.push({sender: "BOB_000", message: "000"});
    msg.remove();
    console.log("Sending TTL to dashboard");
}

function sendQuestions() {
    
}

function  readMessage(data) {
    var sender = data.val().sender;
    var message = data.val().message;

    if(sender === "ALICE" && message === "accept")
    {
        callStatusFlag = true;
        showFriendsFace();
        console.log("Call Accepted: Now sending the ICE")
    }
    else if(sender === "ALICE" && message === "reject")
    {
        callStatusFlag = false;
        console.log("Call Rejected")
    }
    else if(sender === "ALICE" && message === "F")
    {
        roboDrive("002");
        console.log("Going Forward: Code: #002")
    }
    else if(sender === "ALICE" && message === "B")
    {
        roboDrive("003");
        console.log("Going Backward: Code: #003")
    }
    else if(sender === "ALICE" && message === "L")
    {
        roboDrive("004");
        console.log("Going Left: Code: #004")
    }
    else if(sender === "ALICE" && message === "R")
    {
        roboDrive("005");
        console.log("Going Right: Code: #005")
    }
    else if(sender === "ALICE_STF")
    {
        PlaySpeech(message);
        console.log("ALICE_STF: " + message);
    }
    else if(sender === "ALICE")
    {
        document.getElementById("close-btn").style.display = "block";
        friendsVideo.style.display = 'block';
        var msg = JSON.parse(message);
        if (msg.ice !== undefined)
            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        else if (msg.sdp.type === "offer")
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                .then(() => pc.createAnswer())
                .then(answer => pc.setLocalDescription(answer))
                .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
        else if (msg.sdp.type === "answer")
        {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
    }
}



database.on('child_added', readMessage);

function showMyFace() {
    console.log(yourVideo);
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
        .then(stream => yourVideo.srcObject = stream)
        .then(stream => pc.addStream(stream));
}

function showroboCam() {
    var surfVideo = document.getElementById("surv_video");
    console.log(surfVideo);
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
        .then(stream => surfVideo.srcObject = stream)
        .then(stream => pc.addStream(stream));
}

function showFriendsFace() {
    console.log(friendsVideo);
    pc.createOffer()
        .then(offer => pc.setLocalDescription(offer) )
        .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
}


function callRequest() {
    PlaySpeech("Please Hang On, I am connecting you to a live operator.");
    var msg = database.push({ sender: "BOB", message: "calling" });
    msg.remove();
}

function endCall() {
    pc.close();
    closePopup();
    window.location.reload();
}

function roboDrive(directionCode) {
    dataKey = {'code': directionCode};
    console.log("sending Key:" + JSON.stringify(dataKey));

    $.ajax({
        type: "GET",
        data: { key: JSON.stringify(dataKey)},
        url: "/api/sendresponse"
    });
}


function ShowPopupTele(){
// get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // calculate the values for center alignment
    var dialogTop =  '30%';//(maskHeight/3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
    document.getElementById('dialog-box').innerHTML = '\n' +
        '<div class="dialog-content" id="caller_back" style="height:776px;"> <video id="friendsVideo" autoplay playsinline></video>' +
        '<video id="yourVideo" autoplay muted playsinline></video><img onclick="endCall()" id="close-btn" src="/assets/images/icons/close.png" alt=""> ' +
        '<div id="dialog-message" style="text-align: center">' +
        '<div class="call-animation">\n' +
        '<img class="img-circle" src="/assets/images/general/support.png" alt="" width="135"/></div>\n' +
        '<p id="listen_txt" style="font-size:47px;color:#ffffff; padding-top: 30px">Please hang on, <br> I am connecting you to a live operator.</p></div>' +
        '<div onclick="endCall()"><img class="img-circle-close" src="/assets/images/icons/close.png" alt="">' +
        '<p style="font-size:30px;color:#ffffff; padding-top: 10px">End Call</p></div> </div>';
    yourVideo = document.getElementById("yourVideo");
    friendsVideo = document.getElementById("friendsVideo");
    showMyFace();
    callRequest();
}