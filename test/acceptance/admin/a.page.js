"use strict";

module.exports = {
	manageMember: manageMember,
	addMember:    addMember,
	showMember:   showMember,
	addPayment:   addPayment
};

function manageMember (){

	var that         = {};

	that.addBtn      = "#add-member";
	that.searchInput = "#serach-member";
	that.serachBtn   = "#serach-field";

	return that;
}

function addMember (){

	var that       = {};

	that.id        = "#id";
	that.firstName = "#first-name";
	that.lastName  = "#last-name";
	that.title     = "#title";
	that.birthday  = "#birthday";
	that.submitBtn = "#create-member-btn";

	return that;
}

function showMember (){

	var that       = {};

	that.id        = "#id";
	that.firstName = "#first-name";
	that.lastName  = "#last-name";
	that.title     = "#title";
	that.birthday  = "#birthday";

	return that;
}

function addPayment (){

	var that  = {};

	that.addPaymentBtn = "#add-payment-btn";
	that.id            = "#member-id";
	that.date   = "#payment-date";
	that.types   = "#payment-type";
	that.subscription  = "#subscription-amout";
	that.donation      = "#subscription-donation";
	that.events        = "#events-amount";
	that.submit     = "#create-payment-btn";

	return that;
}