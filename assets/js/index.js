;(function () {
	"use strict";

	var hub     = require("./lib/hub.js");
	var request = require("xhr");
	var render  = require("./lib/render.js")(hub);
	var search  = require("./components/search/index")(hub, request);

	document.querySelector("#search-button").addEventListener("click", function () {

		var queries = {
			id: document.querySelector("#search-field-id").value,
			email1: document.querySelector("#search-field-email").value,
			lastName: document.querySelector("#search-field-lastName").value,
		};
		
		hub.emit("click", queries);
	});
}());