"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.getData);
	};

	that.getData = function () {

	    var selectStatus = document.querySelector("#member-status");

	    try {
			var query = {
				id:       document.querySelector("#search-field-id").value,
				email1:   '"' + document.querySelector("#search-field-email").value + '"',
				lastName: document.querySelector("#search-field-lastName").value + "*",
				status:   selectStatus.options[selectStatus.selectedIndex].value
			};
		} catch (e) {
			console.log("Error with query serach param: ", e);
		}

		utils.request(_createOptions(utils.clean.object(query)), function (e, h, b) {

			var members = JSON.parse(b);

			if(checkQuery(query, JSON.parse(b))) {
				window.location = "/members/" + members[0].id
			} else {			
				state.members.set(members);
			}
		});
	};
	
	return that;
};

function checkQuery (query, members) {

	query.email1 = query.email1.replace(/"/g, '');

	return (
		(query.id || query.email1) 
		&& members.length === 1 
		&& (query.id === members[0].id || query.email1 === members[0].email1)
	);
}

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
