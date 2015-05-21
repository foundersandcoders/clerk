"use strict";


var view = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.postData);
	};

	that.postData = function (type) {

		return function () {

			var payload = {
				date: 		 utils.moment(),
				memberId:    document.querySelector("#member-id").textContent,
       			collection:  "charges"
			};

			var value = document.querySelector("#member-controls-subscription-amount").value;

			payload.total       = (type === "charge") ? value          : String(0 - Number(value));
			payload.description = (type === "charge") ? "Subscription" : "Subscription refund";

			utils.request(_createOptions(payload), function (e, h, b) {

				var payments = state.payments();
				payments.unshift(b);
				state.payments.set(payments);
			});
		}
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
