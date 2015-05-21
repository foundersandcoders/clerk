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
				h("button#edit-member-cancel.button-two.m-l-15",{
					onclick: toggleFn
				}, "Cancel"),
				h("button#edit-member-save.button-two.m-l-15",{
					onclick: putFn
				}, "Save")
			]
		} else {
			return [
				h("button#edit-member-mode.button-two.m-l-15",{
					onclick: toggleFn
				}, "Edit")
			]
		}
	}
};