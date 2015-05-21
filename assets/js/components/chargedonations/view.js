"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.container-1", [
		h("p", "Add donation"),
		h("div.gbp", [
			h("input.input-three#member-controls-donation-amount", {
				placeholder: "Amount"
			})
		]),
		h("input.input-four#member-controls-donation-notes", {
			placeholder: "Optional note"
		}),
		h("button.button-two.right.full-width.margin-top-10#member-controls-donation-pay", {
			onclick: fn
		}, "Add")
	]);
};
