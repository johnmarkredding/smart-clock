/*jslint browser: true*/
/*global $, jQuery, alert*/


var cityCode = "4628695", apiKey = "d7e5b1a9e766ce5227e7dcdd8c37bf4d", apiURL = "http://api.openweathermap.org/data/2.5/weather?id=" + cityCode + "&appid=" + apiKey + "&units=imperial", rssURL = "http://www.getrave.com/rss/FHU/channel1", icons = {
	"01d": 'CLEAR_DAY',
	"02d": 'PARTLY_CLOUDY_DAY',
	"03d": 'CLOUDY',
	"04d": 'CLOUDY',
	"09d": 'RAIN',
	"10d": 'RAIN',
	"11d": "SLEET",
	"13d": "SNOW",
	"50d": "FOG",
	"01n": 'CLEAR_NIGHT',
	"02n": 'PARTLY_CLOUDY_NIGHT',
	"03n": 'CLOUDY',
	"04n": 'CLOUDY',
	"09n": 'RAIN',
	"10n": 'RAIN',
	"11n": "SLEET",
	"13n": 'SNOW',
	"50n": 'FOG'
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
		var weatherData = data, tempDegrees = "error!", iconID, iconDesc;
		
		tempDegrees = Math.round(weatherData.main.temp);
		$("#Temp").html(tempDegrees + "<span>°F</span>");
		
		iconID = icons[weatherData.weather[0].icon];
		iconDesc = weatherData.weather[0].description;
		$('.icon').attr('id', iconID);
		$('#Icon').attr('alt', iconDesc);
	});
}

function getLionAlerts() {
	'use strict';

	$.ajax({
		type: 'GET',
		url: rssURL,
		dataType: 'xml',
		error: function () {
			console.log('Unable to load RSS feed');
		},
		success: function (xml) {
			var $items = $(xml).find('item'), LATitle, LADesc;
			
			$items.each(function () {
				LATitle = $(this).find('title').text();
				LADesc = $(this).find('description').text();
				
				$('#LATitle').text(LATitle);
				$('#LADesc').text(LADesc);
			});
		}
	});
}

$(document).ready(function () {
	'use strict';
	setTimeout(function () {
		getTime();
	}, 500);
	
	getDate();
	getWeather();
	getLionAlerts();
});