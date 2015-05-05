"use strict";


var diff          = require('virtual-dom/diff');
var patch         = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');


module.exports = function (hub) {

	//listen for components
	hub.addListener("register", function (config){

		var ii = 0;
		while(ii < config.events.length){
			hub.addListener(config.events[ii].name, config.events[ii].action);
			ii += 1;
		}
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

}