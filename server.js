// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// Logger middleware
app.use(function(req, res, next) {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*** API endpoints ***/

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/',function(req, res){
  
  let unix;
  let utc;
  
  let date = new Date();

  unix = date.getTime();
  utc = date.toUTCString();
  
  let msg = { "unix": unix, "natural": utc };

  res.json(msg);
});

app.get('/api/timestamp/:date_string',function(req, res){
  let param = req.params.date_string;
  
  let unix = null;
  let utc = "Invalid Date";

  if ( param !== "Invalid Date") {
    let date = new Date(param);

    unix = date.getTime();
    utc = date.toUTCString();
  }
  
  let msg = { "unix": unix, "natural": utc };

  res.json(msg);
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

