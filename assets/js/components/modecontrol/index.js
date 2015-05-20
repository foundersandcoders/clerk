"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function (member) {

		return view(that.toggleMode, that.putData, state.mode());
	};

	that.putData = function () {

		try {
			// var payload = {
			// 	title:          get("edit-member-title"),
			// 	initials:       get("edit-member-initials"),
			// 	firstName:      get("edit-member-first-name"),
			// 	lastName:       get("edit-member-last-name"),
			// 	primaryEmail:   get("edit-member-primary-email"),
			// 	secondaryEmail: get("edit-member-secondary-email"),

			// 	addressLine: get(),
			// 	firstName: "Wil",
			// };
		} catch (e) {
			console.log("Error in updating details: ", e);
		}

		utils.request(_createOptions(payload), function (e, h, b) {

			// check if b is object, if not, try and JSON.parse it.
			state.member.set(b);
			that.toggleMode();
		});
	};

	that.toggleMode = function () {

		var mode = (state.mode() === "edit") ? "view" : "edit";
		state.mode.set(mode);
	}

	return that;
};

function _createOptions (payload) {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	return {
		method: "PUT",
		url: "/api/members/" + id,
		json: payload
	}
}

var $$ = function (query) {

	var that = {};
	that.elm = document.getElementByI
}

function get (elm, query) {

	return document.getElementById(elm, query);
}

function val (elm) {

	var e = getElementById(elm);
	return elm.options[e.selectedIndex].value;
}