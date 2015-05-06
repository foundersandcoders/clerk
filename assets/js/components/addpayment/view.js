"use strict";

var h = require("virtual-dom/h");

module.exports = function render (fn) {

	return h("div.super-wrapper", [
		renderInputs(["Date", "Type", "Reference", "Amount", "Notes"]),
		h("div.input-wrapper-2", [
			h("div.button#post-payment", {
				onclick: fn
			}, "Enter")
		]),
		h("div.input-wrapper-2", [
			h("div.button", "Close")
		])
	]);

	function renderInputs (content) {

		return content.map(function (elm) {

			return h("div.input-wrapper-2", [
				h("p", elm + ":"),
				h("input#" + elm.toLowerCase() + "-payment", {
					type: "text"
				})
			]);
		});
	}
}