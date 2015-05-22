"use strict";

var h = require("virtual-dom/h");

module.exports = function render (fn, utils) {

	var renderOptionsSelected = require("../helpers").renderOptionsSelected;

	var paymentTypes = [
		{value:"CHQ", description: "CHQ"},
		{value:"CASH", description: "CASH"},
		{value:"SOA", description: "SOA"},
		{value:"SOR", description: "SOR"},
		{value:"BACSA", description: "BACSA"},
		{value:"BACSR", description: "BACSR"},
		{value:"CAFA", description: "CAFA"},
		{value:"CAFR", description: "CAFR"},
		{value:"HO", description: "HO"}
	];

	var inputs = [{
		placeholder: "Payment date",
		id: "payment-date"
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

	return h("div.container-1", [
		h("p", "Enter payments"),
		h("select#member-controls-membership-type.mb10", renderOptionsSelected(paymentTypes, "", "Select type")),
		renderInputs(inputs)
	]);

	function renderInputs (content) {

		var inputs = content.map(function (elm) {

			var cl = (elm.placeholder === "Notes") ? "input-two" : "input-one";

			return h("input." + cl + "#member-controls-" + elm.id, {
				placeholder: elm.placeholder
			});
		});

		return inputs.concat([
			h("div", [
				h("button.button-two", "Close"),
				h("button.button-one#member-controls-payment-enter.right", {
					onclick: fn
				}, "Enter")
			])
		]);
	}
}