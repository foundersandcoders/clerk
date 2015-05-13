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

		var count = 0;
		var store = [];

		utils.request(_createOptions("payments"), function (e, h, b) {

      console.log("PAYMENTS", arguments);
			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2){
				_render(initial, store, that.render);
			}
		});

		utils.request(_createOptions("charges"), function (e, h, b) {

      console.log("CHARGES", arguments);
			store = store.concat(JSON.parse(b));
			store = store.concat(JSON.parse(b));
			count += 1;

			if(count === 2){
				_render(initial, store, that.render);
			}
		});
	};

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

function _render (initial, data, render) {

	try{

		if (initial) {
			document.querySelector("#table-payments").appendChild(render(data));
		} else {
			render(data);
		}
	} catch (e) {
		console.log("fas: ", e);
	}
}
