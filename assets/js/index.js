;(function () {
	"use strict";

	var hub           = require("./lib/hub.js");
	var request       = require("xhr");
	var render        = require("./lib/render.js")(hub);
	var search        = require("./components/search/index")(hub, request);

	document.querySelector("#search-button").addEventListener("click", function () {

		var query = document.querySelector("#search-field").value;
		hub.emit("click", query);
	});
}());