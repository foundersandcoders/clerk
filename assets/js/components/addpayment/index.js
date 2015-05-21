"use strict";


var view = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.postData);
	};

	that.postData = function (query) {

		try {

      var type = document.querySelector("#member-controls-payment-type").value;
			var payload = {
				memberId:      document.querySelector("#member-id").textContent,
        description:   "Payment by " + type,
				date:          document.querySelector("#member-controls-payment-date").value,
				type:          type,
				listReference: document.querySelector("#member-controls-payment-reference").value,
				total:         document.querySelector("#member-controls-payment-amount").value,
				notes:         document.querySelector("#member-controls-payment-notes").value,
        collection:    "payments"
			};
		} catch (e) {
			console.log("addpayment post: ", e);
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
		url: "/api/payments",
		json: payload
	};
}
