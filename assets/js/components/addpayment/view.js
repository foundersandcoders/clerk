"use strict";

var h = require("virtual-dom/h");

module.exports = function render (fn) {

	var inputs = [{
		placeholder: "Payment date",
		id: "payment-date"
	}, {
		placeholder: "Type",
		id: "payment-type"
	}, {
		placeholder: "Reference",
		id: "payment-reference"
	}, {
		placeholder: "Amount £",
		id: "payment-amount"
	}, {
		placeholder: "Notes",
		id: "payment-notes"
	}];

	return h("div.container", renderInputs(inputs));

	function renderInputs (content) {

		var inputs = content.map(function (elm) {

			var cl = (elm.placeholder === "Notes") ? "input-two" : "input-one";

			return h("input." + cl + "#member-controls-" + elm.id, {
				placeholder: elm.placeholder
			});
		});

		return inputs.concat([
			h("button.button-two.button-a", "Close"),
			h("button.button-one.button-b#member-controls-payment-enter", {
				onclick: fn
			}, "Enter payment")
		]);
	}
}
