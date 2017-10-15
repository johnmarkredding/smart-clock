/*jshint browser: true, esversion: 6*/
/*global $*/
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fetchDate() {
	var currentTime = new Date(),
		 day = currentTime.getDate(),
		 mo = months[currentTime.getMonth()],
		 hr = currentTime.getHours(),
		 min = currentTime.getMinutes(),
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
	const currentTime = new Date().getHours();
	var icon = $('#icon').find('img');
	const result = {
		temp: Math.round(data.main.temp),
		icon: data.weather[0].icon,
		description: data.weather[0].description,
		sunrise: new Date(data.sys.sunrise * 1000),
		sunset: new Date(data.sys.sunset * 1000)
	};
	$("#temp").html(result.temp + "<sup>°F</sup>");
	icon.attr('alt', result.description);
	icon.attr('src', './icons/' +result.icon + '.svg');

	if (currentTime >= result.sunrise.getHours() && currentTime < result.sunset.getHours()) {
		$('#Meridiem').style.color = '#ffe649';
	} else {
		//$('#Meridiem').style.color = '#f8f99c';
		//document.getElementById('Meridiem').color = '#f8f99c';
	}
}
function getWeather(coordinates) {
	const weatherAPIKey = 'd7e5b1a9e766ce5227e7dcdd8c37bf4d',
		 weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lon + '&appid=' + weatherAPIKey + '&units=imperial';
	
	$.getJSON(weatherURL, handleData);
}
function main() {
	
	//Get Date and Time
	setInterval(function() {
		var currentDate = fetchDate();
		$('#date').text(currentDate.date);
		$('#time').html('<time>' + currentDate.time + '</time><abbr id="meridiem">' + currentDate.meridiem + '</abbr>');
	}, 100);

	//Get Weather
	getWeather({lat: '36.1627', lon: '-86.7816'});
	setInterval(function() {
		getWeather({lat: '36.1627', lon: '-86.7816'});
	}, 1000);
	
	//Initialize Mode
	var simple = false;
	//Switch mode on click of anything
	$(document).click(function () {
		simple = !simple;
		if (simple) {
			$('#weather').hide();
			$('body').removeClass('regular');
			$('body').addClass('simple');
		} else {
			$('body').addClass('regular');
			$('body').removeClass('simple');
			$('#weather').show();
		}
	});
}

$(document).ready(main);