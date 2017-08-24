/*jslint browser: true*/
/*global $, jQuery, alert, console, Skycons, require, __dirname, module*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	
	res.render('index', {title: 'Smart Clock', style: 'style.css'});
});

module.exports = router;