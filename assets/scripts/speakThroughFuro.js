
var firebaseConfig = {
    apiKey: "AIzaSyCMzdmJbM2rQbRKrA6hYrf9H4vmKbfHrTM",
    authDomain: "project2-202418.firebaseapp.com",
    databaseURL: "https://project2-202418.firebaseio.com",
    projectId: "project2-202418",
    storageBucket: "",
    messagingSenderId: "1013176200107",
    appId: "1:1013176200107:web:7f97d9de9edb0480"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database().ref();

function readMessage(data) {
    if(data.val().sender === "speaking")
    {
        PlaySpeech(data.val().message);
        console.log("Message is: " + data.val().message);
    }
}
database.on('child_added', readMessage);

