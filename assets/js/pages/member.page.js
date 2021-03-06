"use strict";


var addPaymentComponent         = require("../components/addpayment/index.js");
var chargeDonationComponent     = require("../components/chargedonations/index.js");
var chargeSubscriptionComponent = require("../components/chargesubscriptions/index.js");
var displayPaymentsComponent    = require("../components/displaypayments/index.js");
var memberViewComponent         = require("../components/member.view.component.js").index;
var memberEditComponent         = require("../components/member.edit.component.js").index;


module.exports = function (utils) {

	var state = utils.observS({
		member:   utils.observ({}),
		payments: utils.observ([]),
		mode:     utils.observ("view"),
    	selected: utils.observ([])
	});

	state(function onchange () {
		// console.log("RENDERING", arguments);
		// console.log(state());
		render();
	});

	state.toggleMode = function (){
		var mode = (state.mode() === "edit") ? "view" : "edit";
		state.mode.set(mode);
	};

	var addPayment         = addPaymentComponent(utils, state);
	var chargeDonation     = chargeDonationComponent(utils, state);
	var chargeSubscription = chargeSubscriptionComponent(utils, state);
	var displayPayments    = displayPaymentsComponent(utils, state);
	var memberView         = memberViewComponent(utils, state);
	var memberEdit         = memberEditComponent(utils, state);

	function view (h) {

		return h("div#member-component", [
			h("div.overall-container", [
				renderViewMode(),
				h("div.actions-container", [
					// modeControl.render(),
					// memberStatus.render(),
					h("div.refund-section", [
						chargeSubscription.render()
					]),
					h("div.add-donation-section", [
						chargeDonation.render()
					]),
					h("div.enter-payment-section", [
						addPayment.render()
					])
				])
			]),
			// h("div.enter-payment-section", [
			// 	addPayment.render()
			// ])
		]);

		function renderViewMode() {

			if(state.mode() === "edit") {
				return h("div.content-container", [
					h("div#member-info-edit",[
						memberEdit.render(state.member())
					])
				])
			} else {
				return h("div.content-container", [
					h("div#member-info", [
						memberView.render(state.member())
					]),
					h("div#table-payments",[
						displayPayments.render(state.payments())
					])
				])
			}
		}
	}

	var tree, resultsNode, initial = true;
	
	function render () {

		if(initial){
			tree        = view(utils.h);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(utils.h);
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
