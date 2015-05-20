"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, moment) {
	console.log("ddd",data);
	return h("div.search-table-section-member", [
		h("div.search-table-section-member-header", [
			h("div.col-5", [
				h("p", "ID")
			]),
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
		h("div.search-table-section-member-rows", [
			decide(data)
		])
	]);

	function renderRows (data) {

		return data.map(function (result){

      console.log("RESULT", result.lastSubscription);
			return h("a", {href: "/members/" + result.id}, [
				h("div.row", [
					h("div.col-5", [
						h("p", result.id)
					]),
					h("div.col-1", [
						h("p", result.lastName + " " + result.firstName)
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
					  lastSub(result.lastSubscription)
          ])
				])
			]);
		});
	}

  function lastSub (payment) {

    console.log("PAYMENT: ", payment);
    if (payment) {
      return h("p", moment(payment.date).format("DD MMM YYYY") + " - £" + payment.total);
    } else {
      return h("p", "");
    }
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
