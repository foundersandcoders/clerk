"use strict";

var h = require("virtual-dom/h");

module.exports = function render (fn) {

	var inputs = [{
		placeholder: "Payment date",
		id: "date-payment"
	}, {
		placeholder: "Type",
		id: "type-payment"
	}, {
		placeholder: "Reference",
		id: "reference-payment"
	}, {
		placeholder: "Amount £",
		id: "amount-payment"
	}, {
		placeholder: "Notes",
		id: "notes-payment"
	}];

	return h("div.container", renderInputs(inputs));

	function renderInputs (content) {

		var inputs = content.map(function (elm) {

			var cl = (elm.placeholder === "Notes") ? "input-two" : "input-one";

			return h("input." + cl + "#" + elm.id, {
				placeholder: elm.placeholder
			});
		});

		return inputs.concat([
			h("button.button-two.button-a", "Close"),
			h("button.button-one.button-b", {
				onclick: fn
			}, "Enter payment")
		]);
	}
}