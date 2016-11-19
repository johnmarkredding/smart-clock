/*jslint browser: true*/
/*global $, jQuery, alert*/

var cityCode = "4628695", apiKey = "d7e5b1a9e766ce5227e7dcdd8c37bf4d", apiURL = "//api.openweathermap.org/data/2.5/weather?id=" + cityCode + "&appid=" + apiKey + "&units=imperial", icons = {
	"01d": "A",
	"02d": "C",
	"03d": "C",
	"04d": "P",
	"09d": "R",
	"10d": "F",
	"11d": "U",
	"13d": "W",
	"50d": "a",
	"01n": "I",
	"02n": "J",
	"03n": "J",
	"04n": "P",
	"09n": "R",
	"10n": "K",
	"11n": "U",
	"13n": "W",
	"50n": "a"
};

function getTime() {
	'use strict';
	function startTime() {
		var today = new Date(), h = today.getHours(), m = today.getMinutes(), t;
		if (h < 12) {
			$('#Meridiem').text('am');
			$('#Meridiem').addClass('day');
		} else {
			$('#Meridiem').text('pm');
			$('#Meridiem').addClass('night');
		}
		h = (h > 12) ? h - 12 : h;
		h = (h === 0) ? 12 : h;
		m = (m < 10 ? "0" : "") + m;
		$('time').text(h + ':' + m);
		setTimeout(function () {
			startTime();
		}, 500);
	}
	startTime();
}

function getDate() {
	'use strict';
	var today = new Date(), d = today.getDate(), m = today.getMonth(), months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$('#Date').text(months[m] + ' ' + d);
}

function getWeather() {
	'use strict';
	$.getJSON(apiURL, function (data) {
		var weatherData = data, tempDegrees = "error!", iconName, iconContent;
		
		tempDegrees = Math.round(weatherData.main.temp);
		$("#Temp").html(tempDegrees + "<span>°F</span>");
		
		
		iconName = weatherData.weather[0].icon;
		iconContent = icons[iconName];
		$("#Icon").html(iconContent);
	});
}

$(document).ready(function () {
	'use strict';
	setTimeout(function () {
		getTime();
	}, 500);
	
	getDate();
	getWeather();
});