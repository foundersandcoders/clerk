"use strict";


var view = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.postData);
	};

	that.postData = function (query) {

		try {
			var payload = {
				date: 		 utils.moment(),
				memberId:    document.querySelector("#member-id").textContent,
				description: "Donation",
				total:       document.querySelector("#member-controls-donation-amount").value,
				notes:       document.querySelector("#member-controls-donation-notes").value,
				collection:  "charges"
			};
		} catch (e) {
			console.log("Error post donation: ", e);
		}

		utils.request(_createOptions(payload), function (e, h, b) {

			var payments = state.payments();
			payments.unshift(b);
			state.payments.set(payments);
		});
	};

	return that;
};

function _createOptions (payload) {

	return {
		method: "POST",
		url: "/api/charges",
		json: payload
	};
}
