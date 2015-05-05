;(function () {
	"use strict";

	var hub           = require("./lib/hub.js");
	var request       = require("xhr");
	var search        = require("./components/search/index")(hub, request);
	var diff          = require('virtual-dom/diff');
	var patch         = require('virtual-dom/patch');
	var createElement = require('virtual-dom/create-element');




	document.querySelector("#search-button").addEventListener("click", function () {

		var query = document.querySelector("#search-field").value;
		hub.emit("click", query);	
	});


	// model/data fetching
	hub.addListener("click", function (query) {
		search.getData(query);
	});

	hub.addListener("update", function (component) {

		if (component.rendered) {
			var newResults = component.render()(component.data);
			var patches = diff(component.tree, newResults);
			component.resultsNode = patch(component.resultsNode, patches);
			component.tree = component.resultsNode;
		} else {
			component.tree = component.render()(component.data);
			component.resultsNode = createElement(component.tree);
			document.querySelector(component.selector).appendChild(component.resultsNode);
			component.rendered = true;
		}
	});
}());