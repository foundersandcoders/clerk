"use strict";


var addPaymentComponent         = require("../components/addpayment/index.js");
var chargeDonationComponent     = require("../components/chargedonations/index.js");
var chargeSubscriptionComponent = require("../components/chargesubscriptions/index.js");
var displayPaymentsComponent    = require("../components/displaypayments/index.js");
var memberInfoComponent         = require("../components/memberinfo/index.js");
var memberStatusComponent       = require("../components/memberstatus/index.js");

module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	function view (state, addPayment, chargeDonation, chargeSubscription, displayPayments, memberInfo, memberStatus, h) {

		return h("div#member-component", [
			h("div.overall-container", [
				h("div.content-container", [
					h("div#member-info", [
						memberInfo.render(state.member()),
					]),
					h("div#table-payments",[
						displayPayments.render(state.payments())
					])
				]),
				h("div.actions-container", [
					memberStatus.render(),
					h("div.refund-section", [
						chargeSubscription.render()
					]),
					h("div.add-donation-section", [
						chargeDonation.render()
					])
				])
			]),
			h("div.enter-payment-section", [
				addPayment.render()
			])
		]);
	}

	var state = utils.observS({
		member:   utils.observ({}),
		payments: utils.observ([])
	});

	state(function onchange () {
		console.log("RENDERING", arguments);
		console.log(state());
		render();
	});

	var ap = addPaymentComponent(utils, state);
	var cd = chargeDonationComponent(utils, state);
	var cs = chargeSubscriptionComponent(utils, state);
	var dp = displayPaymentsComponent(utils, state);
	var mi = memberInfoComponent(utils, state);
	var ms = memberStatusComponent(utils, state);

	function render () {

		if(initial){
			tree        = view(state, ap, cd, cs, dp, mi, ms, utils.h);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(state, ap, cd, cs, dp, mi, ms, utils.h);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	}

	try {
		document.querySelector(".full-screen-fixed-members").appendChild(render());
	} catch (e) {
		console.log("View member page err: ", e);
	}
};