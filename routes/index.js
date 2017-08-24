/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons, require, __dirname, module*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	
	res.render('index', {title: 'Smart Clock', style: 'style.css', time: '3:50', meridiem: 'pm', date:'Aug 20', temp: '20' + '°'});
});

module.exports = router;