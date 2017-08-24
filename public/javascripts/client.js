/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons*/

var weatherKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d';
var coordinates = {lat: '36.1627', lon: '86.7816'};
var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherKey + '&units=imperial';



function getDate() {
	var now = new Date(), d = now.getDate(), months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], m = months[now.getMonth()];
	$('#Date').text(m + ' ' + d);
}