"use strict";

var h = require("virtual-dom/h");

module.exports = function (data) {

	return h("div.container-results", [
		h("div.table-results", [
			h("div.table-headers", [
				h("div.header", [
					h("p", "Name")
				]),
				h("div.header", [
					h("p", "Title")
				]),
				h("div.header", [
					h("p", "Initials")
				]),
				h("div.header", [
					h("p", "First Name(s)")
				]),
				h("div.header", [
					h("p", "Last subscription")
				]),
				h("div.header", [
					h("p", "Payment")
				])
			])
		]),
		h("div.table-rows", [
			decide(data)
		])
	]);

	function renderRows (data) {
		
		return data.map(function (result){

			return h("div.table-row", [
				h("a", {href: "/members/" + result.id}, [
					h("div.header", [
						h("p", result.lastName)
					]),
					h("div.header", [
						h("p", result.title)
					]),
					h("div.header", [
						h("p", result.initials)
					]),
					h("div.header", [
						h("p", result.firstName)
					]),
					h("div.header", [
						h("p", result.subscription)
					]),
					h("div.header", [
						h("p", result.subscriptionAmount)
					])
				])
			]);
		});
	}

	function decide (data) {

		if(data.length > 0) {
			return renderRows(data);
		}else{
			return noResults();
		}
	}

	function noResults () {

		return h("p", "No results");
	}
};