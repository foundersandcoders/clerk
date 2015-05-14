"use strict";


var view = require("./view");


module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	try{

		var status = document.querySelector("#member-status").textContent;
	}catch (e){
		console.log("status: ", e);
	}

	function render () {

		if(initial){
			tree        = view(status, updateType, deleteMember, reactivate);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(status, updateType, deleteMember, reactivate);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};


	try {
		var cont = document.querySelector(".actions-container");
		cont.insertBefore(render(), cont.firstChild);
	} catch (e) {


		console.log(e);
	}

	function updateType () {
		var selectElm = document.querySelector("#member-type");

		var payload = {
			membershipType: selectElm.options[selectElm.selectedIndex].value
		};

		utils.request(_createOptions(payload), function (e, h, b) {

      // this is a hack, it needs to be changed when we have parent components
			location.reload();
		});
	}

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
			deletionReason: [],
			status: "active"
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			location.reload();
		});
	}

	function _createOptions (payload) {

		return {
			method: "PUT",
			url: "/api/members/" + document.querySelector("#member-id").textContent,
			json: payload
		};
	}

};
