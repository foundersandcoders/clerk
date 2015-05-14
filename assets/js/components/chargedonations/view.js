"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.container-1", [
		h("p", "Add donation"),
		h("div.gbp", [
			h("input.input-three#payment-amount", {
				placeholder: "Amount"
			})
		]),
		h("input.input-four#donation-notes", {
			placeholder: "Optional note"
		}),
		h("button.button-two.right.full-width.margin-top-10", {
			onclick: fn
		}, "Add")
	]);
};