"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, refreshFn, deleteFn, utils) {


	return h("div.table-section-individual", [
		h("div.table-section-individual-header", [
			h("div.col-1", [
				h("p", "Date")
			]),
			h("div.col-2", [
				h("p", "Description")
			]),
			h("div.col-3", [
				h("p", "Charges")
			]),
			h("div.col-3", [
				h("p", "Payments")
			]),
			h("div.col-4", [
				h("p", "Balance Due")
			]),
			h("div.col-5", [
				h("p", "Reference")
			]),
			h("div.col-6", [
				h("p", "Notes")
			]),
			h("div.col-7", [
				h("p", "Delete")
			])
		]),
		h("div.table-section-individual-rows", renderRows(data))
	]);

	function renderRows (data){

		return data.map(function (elm){

			return h("div.row", [
				h("div.col-1", [
					h("p", utils.moment(elm.date).format("DD-MM-YYYY"))
				]),
				h("div.col-2", [
					h("p", elm.description)
				]),
				h("div.col-3", [
					h("p", (elm.collection === "charges") ? elm.total : "")
				]),
				h("div.col-3", [
					h("p", (elm.collection === "payments") ? elm.total : "")
				]),
				h("div.col-4", [
					h("p", "?")
				]),
				h("div.col-5", [
					h("p", elm.listReference)
				]),
				h("div.col-6", [
					h("p", elm.notes)
				]),
				h("div.col-7", [
					h("p", {
            			onclick: deleteFn(elm.collection, elm.id)
					}, "x")
				])
			])
		});
	}
};
