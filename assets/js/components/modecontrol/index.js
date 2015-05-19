"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function (member) {

		return view(that.toggleMode, that.putData, state.mode());
	};

	that.putData = function () {

		var payload = {
			firstName: "Wil"
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
			that.toggleMode();
		});
	};

	that.toggleMode = function () {

		var mode = (state.mode() === "edit") ? "view" : "edit";
		state.mode.set(mode);
	}

	return that;
};

function _createOptions () {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	return {
		method: "PUT",
		url: "/api/members/" + id,
		body: payload
	}
}
