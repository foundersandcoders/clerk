"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.container-1", [
		h("div.title-ctrl", [
			h("p", "Pay subscription"),
		]),
		h("div.body-ctrl", [
			h("div.gbp", [
				h("input.input-three#member-controls-subscription-amount", {
					placeholder: "Amount"
				})
			]),
		]),
		h("div.container-2", [
			h("button.button-two.left.small-font#member-controls-subscription-pay", {
				onclick: fn("charge")
			}, "Advanced Sub"),
			h("button.button-two.right", {
				onclick: fn("refund")
			}, "Refund")
		])
	])
};
