"use strict";


var diff          = require('virtual-dom/diff');
var patch         = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');


module.exports = function (elem, render) {

	if(!elem) {
		throw new Error(
			"Element does not exist. " +
			"Component can not be initialized.");
	}

	elem.appendChild(render);
};