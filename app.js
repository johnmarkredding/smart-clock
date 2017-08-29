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
function handleData(data) {
	var icons = {
		'01d': 'CLEAR_DAY',
		'02d': 'PARTLY_CLOUDY_DAY',
		'03d': 'CLOUDY',
		'04d': 'CLOUDY',
		'09d': 'RAIN',
		'10d': 'RAIN',
		'11d': 'SLEET',
		'13d': 'SNOW',
		'50d': 'FOG',
		'01n': 'CLEAR_NIGHT',
		'02n': 'PARTLY_CLOUDY_NIGHT',
		'03n': 'CLOUDY',
		'04n': 'CLOUDY',
		'09n': 'RAIN',
		'10n': 'RAIN',
		'11n': 'SLEET',
		'13n': 'SNOW',
		'50n': 'FOG'
	};
	var meridiemColor;
	var currentTime = new Date().getHours();
	var result = {
		temp: Math.round(data.main.temp),
		icon: icons[data.weather[0].icon],
		description: data.weather[0].description,
		sunrise: new Date(data.sys.sunrise * 1000),
		sunset: new Date(data.sys.sunset * 1000)
	};
	$("#temp").html(result.temp + "<sup>°F</sup>");
	$('#' + result.icon).show();
	$('#' + result.icon).attr('alt', result.description);

	if (currentTime >= result.sunrise.getHours() && currentTime < result.sunset.getHours()) {
		$('#Meridiem').css('color', '#FFE649');
	} else {
		$('#Meridiem').css('color', '#F8F99C');
	}
}
function getWeather(coordinates) {
	var weatherAPIKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d',
		 weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherAPIKey + '&units=imperial';
	
	$.getJSON(weatherURL, handleData);
}
function createIcons() {
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
function handleCanvas() {
	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', redrawCanvas, false);

	function redrawCanvas() {
		$('canvas').hide(); 
		createIcons();
	}
	redrawCanvas();
}
function main() {
	
	//Get Date and Time
	setInterval(function() {
		var currentDate = getDate();
		$('#date').text(currentDate.date);
		$('#time').html('<time>' + currentDate.time + '</time><abbr id="meridiem">' + currentDate.meridiem + '</abbr>');
	}, 100);

	//Get Weather
	setInterval(function() {
		getWeather({lat: '36.1627', lon: '-86.7816'});
	}, 2000);
	
	//Get Icon
	handleCanvas();
	
	//Initialize Mode
	var simple = false;
	//Switch mode on click of anything
	$(document).click(function () {
		simple = !simple;
		if (simple) {
			$('#weather').hide();
			$('#style').attr('href', 'simple.css');
		} else {
			$('#style').attr('href', 'regular.css');
			$('#weather').show();
		}
	});
}

$(document).ready(main);