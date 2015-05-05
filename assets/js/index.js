;(function () {
	"use strict";

	var hub = require("./lib/hub.js");
	var request = require("xhr");
	var h = require('virtual-dom/h');
	var diff = require('virtual-dom/diff');
	var patch = require('virtual-dom/patch');
	var createElement = require('virtual-dom/create-element');



	// view/dom manipulation
	function renderResults (result) {

		if (result.length > 0) {
			console.log("results");

			return h("div.results", {}, [
				h("p", result[0].name)
			]);
		} else {
			console.log("no results");
			return h("div.results", {}, [
				h("p", "results go here")
			]); 
		}
	}
	var tree = renderResults([]);
	var resultsNode = createElement(tree);
	document.querySelector("#results").appendChild(resultsNode);



	document.querySelector("#search-btn").addEventListener("click", function () {

		var query = document.querySelector("#search").value;
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

			return cb(JSON.parse(b));
		});
	});

}());