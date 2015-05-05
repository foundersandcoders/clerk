;(function () {
	"use strict";

	var hub = require("./lib/hub.js");
	var request = require("./services/request.js");
	var h = require('virtual-dom/h');
	var diff = require('virtual-dom/diff');
	var patch = require('virtual-dom/patch');
	var createElement = require('virtual-dom/create-element');



	// view/dom manipulation
	function renderResults (result) {

		if (result.length > 0) {
			console.log("results");
			return h("div.innerSectionContainer", [
				h("a", {
					href: "/members/" + result[0].id
				}, [
					h("div.inner-section-divider-small", [
						h("div.field", [
							h("p.meta", result[0].name)
						]),
						h("div.field", [
							h("p.meta", result[0].id)
						])
					])
				])
			]);
		} else {
			console.log("no results");
			return h("div.innerSectionContainer", [
				h("div.inner-section-divider-small", [
					h("div.field", [
						h("p.meta", "No results")
					])
	
				])
			]);
		}
	}
	var tree = renderResults([]);
	var resultsNode = createElement(tree);
	// document.querySelector(".container-results").appendChild(resultsNode);



	document.querySelector("#search-button").addEventListener("click", function () {

		var query = document.querySelector("#search-field").value;
		hub.emit("click", query, function (res) {

			console.log(res);
			var newResults = renderResults(res);
			var patches = diff(tree, newResults);
			resultsNode = patch(resultsNode, patches);

			tree = newResults;
		});	
	});


	// model/data fetching
	hub.addListener("click", function (query, cb) {
		var opts = {
			method: "GET",
			url: "/members?id=" + query
		};
		request(opts, function (e, h, b) {
			console.log(b);
			return cb(JSON.parse(b));
		});
	});

}());