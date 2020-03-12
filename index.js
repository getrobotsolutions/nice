var express = require('express');
var bodyParser = require('body-parser');
let cls = require('continuation-local-storage');

//--------------------------------------------For inter browser communication-------------
var path = require('path');
let namespace = cls.createNamespace('com.chrometest');
var testmessage = "";
//-----------------------------------------------------------------------------------------
var app = express();

//--------------------------------------------For inter browser communication-------------

app.use((req, res, next) => {
    var namespace = cls.getNamespace('com.chrometest');
    // wrap the events from request and response
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    // run following middleware in the scope of the namespace we created
    namespace.run(function () {
        // set data on the namespace, makes it available for all continuations
        namespace.set('message', testmessage);
        next();
    });
});


app.get('/api/sendresponse', (req, res) => { testmessage = req["query"]; res.send('ok') } );
app.get('/api/getresponse', (req, res) => { res.send(namespace.get('message')) } );

app.use(express.static(__dirname));

//-----------------------------------------------------------------------------------------


app.listen(3003);
console.log('MiOttawa running on port 3003');