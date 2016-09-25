# Earthquake Data
Application showing historic earthquakes' data

Built using AngularJS, Node.js, and Express.

Deployed [here] (http://earthquakedata.herokuapp.com/).

Application Design
===========
## Run the application
If you want to deploy this locally instead of accessing it at the link above, make sure you have Node installed. Go into the root directory (with all the files) and run 'node server'. Open a browser, and go to localhost:3000 to see the page.

## Server
The server-side code is implemented in server.js. The server gets started, and the API called by the client is in this file. There's only one API: get all the earthquake data from earthquake.usgs.gov.

## Controllers
Core.js is the middleware between server and client. There are two controllers, one for the main page and one for the modal boxes showing more earthquake information per earthquake. The main controller processes the earthquake data from the API and stores them as objects. There are also functions to extract magnitudes and location strings.

## Views
index.html is the home page view, and it loads all the earthquake data. modal.html is the view for each earthquake's modal box. 
