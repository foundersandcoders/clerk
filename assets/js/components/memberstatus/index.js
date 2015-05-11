"use strict";


var view = require("./view");


module.exports = function (utils) {


	var tree, resultsNode, initial = true;
	var status = document.querySelector("#memberstatus").textContent;

	function render () {

		if(initial){
			tree        = view(status, deleteMember, reactivate);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(status, deleteMember, reactivate);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};


	try {
		document.querySelector(".container-controls").appendChild(render());
	} catch (e) {}


	function deleteMember () {

		var selectElm = document.querySelector("#deletion-reason");

		var payload = {
			deletionReason: selectElm.options[selectElm.selectedIndex].value,
			status: "deleted"
		};
		
		utils.request(_createOptions(payload), function (e, h, b) {

			location.reload();
		});
	}

	function reactivate () {

		var payload = {
			deletionReason: null,
			status: "active"
		};
		
		utils.request(_createOptions(payload), function (e, h, b) {

			location.reload();
		});

	}

	function _createOptions (payload) {

		return {
			method: "PUT",
			url: "/api/members/" + document.querySelector("#memberid").textContent,
			json: payload
		};
	}

};