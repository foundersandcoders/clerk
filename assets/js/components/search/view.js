"use strict";

var h = require("virtual-dom/h");

module.exports = function (data) {





	return h("div#search-results", [

		h("div.table-section-member", [
			h("div.col-1", [
				h("p", "Name")
			]),
			h("div.col-2", [
				h("p", "Title")
			]),
			h("div.col-3", [
				h("p", "Initials")
			]),
			h("div.col-4", [
				h("p", "Subscription")
			]),
			h("div.col-5", [
				h("p", "Payment")
			])
		]),
		decide(data)
	]);

	function renderRows (data) {
		
		return data.map(function (result){

			return h("div.table-section-member.content", [
				h("a", {href: "/members/" + result.id}, [
					h("div.col-1", [
						h("p", result.firstName + " " + result.lastName)
					]),
					h("div.col-2", [
						h("p", result.title)
					]),
					h("div.col-3", [
						h("p", result.initials)
					]),
					h("div.col-4", [
						h("p", result.membershipType)
					]),
					h("div.col-5", [
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