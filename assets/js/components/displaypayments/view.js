"use strict";

var h = require("virtual-dom/h");

module.exports = function (data) {


	return h("div.table-section-individual", [
		h("div.table-section-individual-header", [
			h("div.col-1", [
				h("p", "Date")
			]),
			h("div.col-2", [
				h("p", "Description")
			]),
			h("div.col-3", [
				h("p", "Cost £")
			]),
			h("div.col-4", [
				h("p", "Due £")
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
					h("p", elm.datePaid)
				]),
				h("div.col-2", [
					h("p", elm.description)
				]),
				h("div.col-3", [
					h("p", elm.total)
				]),
				h("div.col-4", [
					h("p", "?")
				]),
				h("div.col-5", [
					h("p", elm.reference)
				]),
				h("div.col-6", [
					h("p", elm.notes)
				]),
				h("div.col-7", [
					h("p", {
						onclick: function () {
							console.log(elm.id);
						}
					}, "X")
				])
			])		 
		});
	}
};