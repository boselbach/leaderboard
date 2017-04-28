(function() {
	'use strict';

	var util = require("util");
	var EventEmitter = require("events").EventEmitter;
	var TwitterApp = require('twitter');

	util.inherits(Rehydrate, EventEmitter);

	function Rehydrate(options) {
		EventEmitter.call(this);

		console.log('Loaded twitter app!!!!!');
		try {
			this.twitterApp = new TwitterApp(options);
		} catch (err) {
			throw err;
		}
	}

	Rehydrate.prototype.create = function() {
		console.log('test');
	};

	module.exports = Rehydrate;

}());
