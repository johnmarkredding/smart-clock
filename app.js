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
	min = (min < 10 ? "0" : "") + min;

	var time = hr + ':' + min, 
		 date = mo + ' ' + day;
	return {date: date, time: time, meridiem: meridiem};
}
function getWeather(coordinates) {
	var weatherAPIKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d',
		 weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherAPIKey + '&units=imperial';
	
	$.getJSON(weatherURL, function(data) {
		var result = {temp: Math.round(data.main.temp), icon: data.weather[0].icon, description: data.weather[0].description};
		$("#temp").html(result.temp + "<small>°F</small>");
		//result.icon;
		//result.description;
	});
}

$(document).ready(function() {
	//Define mode switch
	//var simple = true;
	$('#weather').hide();
	
/*
	
	$(document).click(function() {
		simple = !simple;
		if (simple) {
			$('#weather').hide();
			$('#style').attr('href', 'simple.css');
		} else {
			$('#weather').show();
			$('#style').attr('href', 'regular.css');
		}
	});
	
	//Get Date and Time
	setInterval(function() {
		var currentDate = getDate();
		$('#date').text(currentDate.date);
		$('#time').html('<time>' + currentDate.time + '</time>');
		$('#meridiem').text(currentDate.meridiem);
	}, 100);

	//Get Weather
	setInterval(function() {
		getWeather({lat: '36.1627', lon: '-86.7816'});
	}, 2000);
	
*/
});