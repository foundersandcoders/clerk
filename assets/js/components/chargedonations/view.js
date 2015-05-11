"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.donation-payment", [
		h("p", "Amount: "),
		h("input#payment-amount", {type: "text"}),
		h("div.textarea-wrap", [
			h("p", "Notes: "),
			h("textarea#donation-notes")
		]),
		h("div.button",{
			onclick: fn
		}, "Add")
	]);
};