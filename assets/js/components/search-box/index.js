"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.getData);
	};

	that.getData = function () {

	    var selectStatus = document.querySelector("#member-status");

		var query = {
			id:       document.querySelector("#search-field-id").value,
			email1:   document.querySelector("#search-field-email").value,
			lastName: document.querySelector("#search-field-lastName").value,
      		status:   selectStatus.options[selectStatus.selectedIndex].value
		};

		utils.request(_createOptions(utils.clean.object(query)), function (e, h, b) {

			var members = JSON.parse(b);
			state.members.set(members);
		});
	};
	
	return that;
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
