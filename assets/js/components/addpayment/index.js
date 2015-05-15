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
				memberId:   document.querySelector("#member-id").textContent,
				date:       document.querySelector("#date-payment").value,
				type:       document.querySelector("#type-payment").value,
				reference:  document.querySelector("#reference-payment").value,
				total:      document.querySelector("#amount-payment").value,
				notes:      document.querySelector("#notes-payment").value,
	      		collection: "payments"
			};
		} catch (e) {
			console.log("addpayment post: ", e);
		}

		utils.request(_createOptions(payload), function (e, h, b) {

			render();
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