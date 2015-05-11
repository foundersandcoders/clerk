"use strict";


var view = require("./view");


module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	function render () {

		if(initial){
			tree        = view(postData);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(postData);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};

	function postData (type) {

		return function () {

			var payload = {
				memberId:    document.querySelector("#memberid").textContent
			};

			var value = document.querySelector("#payment-amount").value;

			payload.amount      = (type === "charge") ? value          : 0 - Number(value);
			payload.description = (type === "charge") ? "Subscription" : "Subscription refund";

			utils.request(_createOptions(payload), function (e, h, b) {

				render();
			});
		}
	};

	try {
		document.querySelector(".container-controls").appendChild(render());
	} catch (e) {}
};

function _createOptions (payload) {

	return {
		method: "POST",
		url: "/api/charges",
		json: payload
	};
}