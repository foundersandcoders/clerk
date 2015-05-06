"use strict";


var view = require("./view");


module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	function render (data) {

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
			date:      document.querySelector("#date-payment").value,
			type:      document.querySelector("#type-payment").value,
			reference: document.querySelector("#reference-payment").value,
			amount:    document.querySelector("#amount-payment").value,
			notes:     document.querySelector("#notes-payment").value
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			render();
		});
	};

	try {
		document.querySelector(".container-bottom").appendChild(render());
	} catch (e) {}

};

function _createOptions (payload) {

	return {
		method: "POST",
		url: "/api/payments",
		json: payload
	};
}