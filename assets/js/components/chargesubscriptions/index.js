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
				memberId:    document.querySelector("#member-id").textContent,
        collection:  "charges"
			};

			var value = document.querySelector("#payment-amount").value;

			payload.total       = (type === "charge") ? value          : 0 - Number(value);
			payload.description = (type === "charge") ? "Subscription" : "Subscription refund";

			utils.request(_createOptions(payload), function (e, h, b) {

        // this is a hack, it needs to be changed when we have parent components
			  location.reload();
      });
		}
	};

	try {
		document.querySelector(".refund-section").appendChild(render());
	} catch (e) {}
};

function _createOptions (payload) {

	return {
		method: "POST",
		url: "/api/charges",
		json: payload
	};
}
