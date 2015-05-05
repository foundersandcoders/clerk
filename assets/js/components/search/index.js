"use strict";

var view  = require("./view");
var is    = require("torf");
var clean = require("d-bap");

module.exports = function (hub, request) {

	var that  = {};
	var _data = {};
	that.selector = ".container-content";


	Object.defineProperty(that, "data", {
		enumerable: true,
		set: function (newVal) {

			_data = newVal;
			hub.emit("update", that);
		},
		get: function (){
			return _data;
		}
	});

	that.render = function () {

		return view;
	};
	that.getData = function (query) {

		request(_createOptions(clean.object(query)), function (e, h, b) {

			that.data = JSON.parse(b);
		});
	};


	that.config = {
		events: [
			{name: "click", action: that.getData},
		]
	};

	console.log(hub);

	hub.emit("register", that.config);

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