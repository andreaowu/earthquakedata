// good resource to learn: https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

var express  = require('express');
var app      = express();                   

app.use(express.static(__dirname + '/public'));

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");

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
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
