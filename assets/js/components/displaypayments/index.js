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

		var store = [];
		var count = 0;

		utils.request(_createOptions("payments"), function (e, h, b) {

			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2) {
				store.sort(function (a, b) {
					var diff = moment(a.datePaid) - moment(b.datePaid);
					return (diff > 0) ? -1 : (diff === 0) ? 0 : 1;
				});
				state.payments.set(store);
			}
		});

		utils.request(_createOptions("charges"), function (e, h, b) {

			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2) {
				store.sort(function (a, b) {
					var diff = moment(a.datePaid) - moment(b.datePaid);
					return (diff > 0) ? -1 : (diff === 0) ? 0 : 1;
				});
				state.payments.set(store);
			}
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