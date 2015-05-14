"use strict";


var view  = require("./view");


module.exports = function (utils) {

	var that = {};

	var tree, resultsNode, initial = true;

	that.render = function (data) {

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

	that.getData = function () {

		utils.request(_createOptions(), function (e, h, b) {

			return that.render(JSON.parse(b));
		});
	};

	try {
		document.querySelector(".content-container").appendChild(that.getData());
	}catch (e){
		console.log("Show data member", e);
	}

	return that;
};

function _createOptions () {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	return {
		method: "GET",
		url: "/api/member/" + id
	}
}