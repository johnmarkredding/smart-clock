/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons*/
function getDate() {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var now = new Date(),
		 day = now.getDate(),
		 mo = months[now.getMonth()],
		 hr = now.getHours(),
		 min = now.getMinutes(),
		 meridiem = hr >= 12 ? 'pm' : 'am';

	//Reformat to common time notation.
	if (hr > 12) {
		hr -= 12;
	} else if (hr === 0) {
		hr = 12;
	}
	
	var time = hr + ':' + min, 
		 date = mo + ' ' + day;
	return {date: date, time: time, meridiem: meridiem};
}
function getWeather() {
	var weatherAPIKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d',
		 coordinates = {lat: '36.1627', lon: '86.7816'},
		 weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherAPIKey + '&units=imperial';
	
	$.getJSON(weatherURL, function(data) {
		
	});
}

$( document ).ready(function() {
	
	
	setInterval(function() {
		var currentDate = getDate();
		$('#time').text(currentDate.date + ' ' + currentDate.time + currentDate.meridiem);
	}, 500);
});