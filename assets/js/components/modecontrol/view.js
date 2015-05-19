"use strict";

var h = require("virtual-dom/h");

module.exports = function (toggleFn, putFn, mode) {	

	return h("div.member-type-section", [
		h("div.title-ctrl", [
			h("p", "Mode"),
		]),
		h("div.body-ctrl", whichMode())
	]);

	function whichMode () {
		if (mode === "edit") {
			return [
				h("button.button-two.m-l-15",{
					onclick: toggleFn
				}, "Cancel"),
				h("button.button-two.m-l-15",{
					onclick: putFn
				}, "Save")
			]
		} else {
			return [
				h("button.button-two.m-l-15",{
					onclick: toggleFn
				}, "Edit")
			]
		}
	}
};