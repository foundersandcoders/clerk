"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function (member) {

		return view(member, utils);
	};

	that.getData = function () {

		utils.request(_createOptions(), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
		});
	};

	that.getData();

	return that;
};

function _createOptions () {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	return {
		method: "GET",
		url: "/api/members/" + id
	}
}