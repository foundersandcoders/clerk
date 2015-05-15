"use strict";


var view  = require("./view");
var moment = require("moment");


module.exports = function (utils, state) {

	var that = {};

	that.render = function (payments) {

		return view(payments, that.getData, that.deletePayment, utils);
	};

	that.deletePayment = function (collection, id) {

	    return function () {
			var opts = {
				method: "DELETE",
				url: "/api/" + collection + "/" + id
			};
			utils.request(opts, function (e, h, b) {

				that.getData();
			});
	    }
	};

	that.getData = function () {

		utils.request(_createOptions("payments"), function (e, h, b) {

			console.log(b);
			var payments = JSON.parse(b).sort(function (a, b) {
				var diff = moment(a.datePaid) - moment(b.datePaid);
				return (diff > 0) ? 1 : (diff === 0) ? 0 : -1;
			});

			state.payments.set(payments);
		});
	};

	that.getData();
	return that;
};

function _createOptions (item) {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Erro: ", e);
	}

	return {
		method: "GET",
		url: "/api/" + item + "?memberId=" + id
	}
}