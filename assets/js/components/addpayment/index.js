"use strict";


var view = require("./view");


module.exports = function (utils, state) {

	var $$ = utils.$$;
	var that = {};

	that.render = function () {

		return view(that.postData, utils);
	};

	that.postData = function (query) {

		try {
			var payload = {
				memberId:      $$("member-id").text(),
				type:          $$("member-controls-membership-type").valSelect(),
				date:          $$("member-controls-payment-date").value(),
				listReference: $$("member-controls-payment-reference").value(),
				total:         $$("member-controls-payment-amount").value(),
				notes:         $$("member-controls-payment-notes").value(),
        		description:   "Payment by " + $$("member-controls-membership-type").valSelect(),
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
