"use strict";

var view  = require("./view");

module.exports = function (utils) {
	
	var tree, resultsNode, initial = true;

	function render (data) {

		// abstract this into single shared function
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

		var query = {
			id:       document.querySelector("#search-field-id").value,
			email1:   document.querySelector("#search-field-email").value,
			lastName: document.querySelector("#search-field-lastName").value,
		};

		utils.request(_createOptions(utils.clean.object(query)), function (e, h, b) {

			// refarctor this
			if (initial) {
				document.querySelector(".container-content").appendChild(render(JSON.parse(b)));
			} else {
				render(JSON.parse(b));
			}
		});
	};

	try {
		document.querySelector("#search-button").addEventListener("click", function () {

			getData();
		});
	} catch (e) {};


	return;
};











































function _createQuery(query) {

	var field, storeString = [];
	for (field in query) {
		if(query.hasOwnProperty(field)){
			storeString.push(field + "=" + query[field]);
		}
	}

	return "?" + storeString.join("&");
}

function _createOptions (query) {

	return {
		method: "GET",
		url: "/api/members" + _createQuery(query)
	}
}