"use strict";

var h = require("virtual-dom/h");

module.exports = function (data) {

	return function (){
		return h("div.table-results", [
			h("div.table-headers", [
				renderHeaders(["Date", "Description", "Cost", "Payment", "Due", "Reference", "Notes", "Edit"]),
			]),
			h("div.table-rows", [
				renderRows(data)
			])
		]);
	}

	function renderHeaders (headers) {
		return headers.map(function (elm){

			return h("div.header", [
				h("p", elm)
			]);
		});
	}


	function renderRows (data) {
		return data.map(function (elm){

			return h("div.table-row", [
				h("div.header", [
					h("p", elm.date)
				]),
				h("div.header", [
					h("p", elm.description)
				]),
				h("div.header", [
					h("p", elm.cost)
				]),
				h("div.header", [
					h("p", elm.payment)
				]),
				h("div.header", [
					h("p", elm.due)
				]),
				h("div.header", [
					h("p", elm.reference)
				]),
				h("div.header", [
					h("p", elm.notes)
				]),
				h("div.header", [
					h("p", "elm.notes")
				])
			])
		});
	}
};