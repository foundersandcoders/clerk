"use strict";

var view = require("./view");

module.exports = function (hub, request) {

	var that  = {};
	that.rendered = false;
	that.selector = ".container-content";

	var _data = {};

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

		request(_createOptions(query), function (e, h, b) {

			that.data = JSON.parse(b);
		});
	};

	return that;
};


function _createQuery(query) {

	if (query) {
		return "?id=" + query;
	} else {
		return "";
	}
}

function _createOptions (query) {

	return {
		method: "GET",
		url: "/members" + _createQuery(query)
	}
}