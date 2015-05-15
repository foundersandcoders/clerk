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
				memberId:    document.querySelector("#member-id").textContent,
				description: "Donation",
				total:       document.querySelector("#payment-amount").value,
				notes:       document.querySelector("#donation-notes").value,
				collection:  "charges"
			};
		} catch (e) {
			console.log("Error post donation: ", e);
		}

		utils.request(_createOptions(payload), function (e, h, b) {

			var payments = state.payments();
			payments.push(b);
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
