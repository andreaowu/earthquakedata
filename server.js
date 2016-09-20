// good resource to learn: https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

var express  = require('express');
var app      = express();                   // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// API docs: http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

// Get all earthquake data
app.get('/api/all', function(req, res) {
	var request = require('request');
	request('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=0.1', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        res.send(body);
	     } else {
	     	res.send(error);
	     }
	});
});


// Loads the file on the browser
app.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});