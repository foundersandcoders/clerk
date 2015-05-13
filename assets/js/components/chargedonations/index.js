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

	function postData (query) {

		var payload = {
			memberId:    document.querySelector("#member-id").textContent,
			description: "Donation",
			amount:      document.querySelector("#payment-amount").value,
			notes:       document.querySelector("#donation-notes").value
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			render();
		});
	};

	try {
		document.querySelector(".add-donation-section").appendChild(render());
	} catch (e) {}
};

function _createOptions (payload) {

	return {
		method: "POST",
		url: "/api/charges",
		json: payload
	};
}