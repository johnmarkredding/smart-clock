/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons*/

var weatherData = {};
var weatherURL = '';
var weatherKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d';
var coordinates = {lat: 0, lon: 0};

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function (pos) {
		coordinates = {
			lat: pos.coords.latitude,
			lon: pos.coords.longitude
		};
	});
} else {
	//Defaults to Nashville, TN
	coordinates = {
		lat: '36.1627',
		lon: '86.7816'
	};
}
weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherKey + '&units=imperial';

var request = new XMLHttpRequest();
request.open('GET', weatherURL, true);

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		// Success!
		weatherData = JSON.parse(request.responseText);
	} else {
		// We reached our target server, but it returned an error.
		console.log('Reached server with error');
	}
};
request.onerror = function() {
	// There was a connection error.
	console.log('No server connection');
};
request.send();