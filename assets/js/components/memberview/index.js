"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(state.member(), utils);
	};

	that.getData = function () {

		utils.request(utils.createOpts("GET"), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
		});
	};

	that.getData();

	return that;
};