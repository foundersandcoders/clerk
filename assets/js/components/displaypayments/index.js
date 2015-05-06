"use strict";


var view  = require("./view");


module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	function render (data) {

		if(initial){
			tree        = view(data);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(data);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};

	function getData (query) {

		request(_createOptions(), function (e, h, b) {

			// refarctor this
			if (initial) {
				document.querySelector(".container-payments").appendChild(render(JSON.parse(b)));
			} else {
				render(JSON.parse(b));
			}
		});
	};
};

function _createOptions (id) {

	return {
		method: "GET",
		url: "/api/payments?member=" + document.querySelector("#memberid").value
	}
}