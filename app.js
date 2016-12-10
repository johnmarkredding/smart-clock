/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons*/

var cityCode = "4628695", apiKey = "d7e5b1a9e766ce5227e7dcdd8c37bf4d", apiURL = "http://api.openweathermap.org/data/2.5/weather?id=" + cityCode + "&appid=" + apiKey + "&units=imperial", rssURL = "http://www.getrave.com/rss/FHU/channel1", iconDict = {
	"01d": 'CLEAR_DAY',
	"02d": 'PARTLY_CLOUDY_DAY',
	"03d": 'CLOUDY',
	"04d": 'CLOUDY',
	"09d": 'RAIN',
	"10d": 'RAIN',
	"11d": 'SLEET',
	"13d": 'SNOW',
	"50d": 'FOG',
	"01n": 'CLEAR_NIGHT',
	"02n": 'PARTLY_CLOUDY_NIGHT',
	"03n": 'CLOUDY',
	"04n": 'CLOUDY',
	"09n": 'RAIN',
	"10n": 'RAIN',
	"11n": 'SLEET',
	"13n": 'SNOW',
	"50n": 'FOG'
};

function createIcons() {
	'use strict';
	var icons = new Skycons({
		'monochrome': false,
		"colors": {
			"main": "#FFF",
			moon: "#F8F99C",
			fog: "#999",
			fogbank: "#FFF",
			cloud: "#999",
			snow: "#FFF",
			leaf: "#45A000",
			rain: "#1A5FB3",
			sun: "#FFE649"
		}
	}),
		list = [
			"CLEAR_DAY",
			"CLEAR_NIGHT",
			"PARTLY_CLOUDY_DAY",
			"PARTLY_CLOUDY_NIGHT",
			"CLOUDY",
			"RAIN",
			"SLEET",
			"SNOW",
			"WIND",
			"FOG"
		],
		i;
	for (i = list.length; i >= 0; i -= 1) {
		icons.set(list[i], list[i]);
	}
	icons.play();
}

function marquee(a, b) {
	'use strict';
	var width = b.width(), start_pos = a.width(), end_pos = -width, time;

	function scroll() {
		if (b.position().left <= -width) {
			b.css('left', start_pos);
			scroll();
		} else { time = (parseInt(b.position().left, 10) - end_pos) *
				(10000 / (start_pos - end_pos)); // Increase or decrease speed by changing value 10000
			b.animate({
				'left': -width
			}, time, 'linear', function () {
				scroll();
			});
			}
	}

	b.css({
		'width': width,
		'left': start_pos
	});
	scroll(a, b);
}

function getTime() {
	'use strict';
	function startTime() {
		var today = new Date(), h = today.getHours(), m = today.getMinutes(), t;
		if (h < 12) {
			$('#Meridiem').text('am');
		} else {
			$('#Meridiem').text('pm');
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
	var returnObj = $.getJSON(apiURL, function (data) {
		var weatherData = data, tempDegrees = "error!", iconID, iconDesc, sunrise, sunset, today = new Date(), hour = today.getHours();
		tempDegrees = Math.round(weatherData.main.temp);
		$("#Temp").html(tempDegrees + "<span>°F</span>");
		iconID = iconDict[weatherData.weather[0].icon];
		iconDesc = weatherData.weather[0].description;
		$('#' + iconID).addClass('visible');
		$('#' + iconID).attr('alt', iconDesc);
		
		sunrise = new Date(weatherData.sys.sunrise * 1000);
		sunset = new Date(weatherData.sys.sunset * 1000);
		if (hour >= sunrise.getHours() && hour <= sunset.getHours()) {
			$('#Meridiem').addClass('day');
		} else {
			$('#Meridiem').addClass('night');
		}
	});
}

function getLionAlert() {
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
	var modes = ['styles', 'lionAlert', 'contrast', 'class'], modeURL = '', index = 0;
	//----Time---------//
	setInterval(
		getTime(),
		500
	);
	
	//----Date---------//	
	setInterval(
		getDate(),
		500
	);
	
	//----Weather------//
	setInterval(
		getWeather(),
		600000
	);
	
	//----LionAlert----//
	setInterval(
		getLionAlert(),
		60000
	);
	//marquee($('footer'), $('#Marquee'));
	
	//----Icons--------//
	createIcons();
	
	//----Change-Mode--//
	$('#NormalMode').attr('disabled', false);
	$("time").click(function () {
		modeURL = modes[index] + '.css';
		index = (index + 1) % (modes.length);
		$('link').attr('href', modeURL);
	});

});