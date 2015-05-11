"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.subscription-payment", [
		h("div.button", {
			onclick: fn("charge")
		}, "Advance Subscription"),
		h("div.button", {
			onclick: fn("refund")
		}, "Refund"),
		h("div.input-wrapper", [
			h("p", "Amount: "),
			h("input#payment-amount", {
				type: "text"
			})
		])
	]);

};