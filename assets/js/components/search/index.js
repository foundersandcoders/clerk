"use strict";

var view  = require("./view");

module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(state.members());
	};

	return that;
};