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

function getDate() {
	var now = new Date(), d = now.getDate(), m = now.getMonth(), months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$('#Date').text(months[m] + ' ' + d);
}