"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, selected, selectFn, refreshFn, deleteFn, utils) {


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
				h("button#member-delete-payment.button-two.m-l-15.right.w-full.red",{
					onclick: deleteFn
				}, "Del.")
			])
		]),
		h("div.table-section-individual-rows", renderRows(data))
	]);

	function renderRows (data){

		return data.map(function (elm){

      var sel = selected.some(function (s) {
        return s.id === elm.id;
      }) ? "selected" : "unselected";

      var ref = {
        id: elm.id,
        collection: elm.collection
      };

      return h("div.row." + sel, [
				h("div.col-1", [
					h("p#member-payment-date", utils.moment(elm.date).format("DD-MM-YYYY"))
				]),
				h("div.col-2", [
					h("p#member-payment-description", elm.description)
				]),
				h("div.col-3", [
					h("p#member-payment-charges", (elm.collection === "charges") ? elm.total.toString() : "")
				]),
				h("div.col-3", [
					h("p#member-payment-payments", (elm.collection === "payments") ? elm.total.toString() : "")
				]),
				h("div.col-4", [
					h("p#member-payment-balance-due", elm.balanceDue)
				]),
				h("div.col-5", [
					h("p#member-payment-reference", elm.listReference)
				]),
				h("div.col-6", [
					h("p#member-payment-notes", elm.notes)
				]),
				h("div.col-7", [
					h("p#member-payment-delete", {
            			onclick: selectFn(ref)
					}, "x")
				])
			])
		});
	}
};
