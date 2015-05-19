"use strict";


var h = require("virtual-dom/h");


module.exports = function (data, utils) {
	
	var memberTypes = require("../helpers").memberTypes;
	var newsType    = [{
			value: "post",
			description: "Post"
		},{
			value: "online",
			description: "Online"
		}
	];

	return ([
		renderPersonalInfo(data),
		renderAddressInfo(data),
		renderMembership(data)
	]);

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("h2", "Personal info"),
			h("p", [
				h("span.info", "ID: "),
				h("input#edit-member-id", {
					type: "text",
					value: member.id
				})
			]),
			h("p", [
				h("span.info", "Title: "),
				h("input#edit-member-title", {
					type: "text",
					value: member.title || ""
				})
			]),
			h("p", [
				h("span.info", "Initials: "),
				h("input#edit-member-initials", {
					type: "text",
					value: member.initials || ""
				})
			]),
			h("p", [
				h("span.info", "First name: "),
				h("input#edit-member-first-name", {
					type: "text",
					value: member.firstName || ""
				})
			]),
			h("p", [
				h("span.info", "Last name: "),
				h("input#edit-member-last-name", {
					type: "text",
					value: member.lastName || ""
				})
			]),
			h("p", [
				h("span.info", "Primary email: "),
				h("input#edit-member-primary-email", {
					type: "text",
					value: member.email1 || ""
				})
			]),
			h("p", [
				h("span.info", "Secondary email: "),
				h("input#edit-member-secondary-email", {
					type: "text",
					value: member.email2 || ""
				})
			]),
			h("p", [
				h("span.info", "News: "),
				h("select", renderOptionsSelected(newsType, (member.onlineMember ? "online" : "post"), "Select news"))
			]),
			h("p", [
				h("span.info", "Status: "),
				h("input#edit-member-status", {
					type: "text",
					value: member.status || ""
				})
			]),
			// deletedInfo(member)
		]);
	}

	function renderAddressInfo (member) {

		return h("div.col-2", [
			h("h2", "Address info"),
			h("p", [
				h("span.info", "Address 1: "),
				h("input#edit-member-address1", {
					type: "text",
					value: member.address1 || ""
				})
			]),
			h("p", [
				h("span.info", "Address 2: "),
				h("input#edit-member-address2", {
					type: "text",
					value: member.address2 || ""
				})
			]),
			h("p", [
				h("span.info", "Address 3: "),
				h("input#edit-member-address3", {
					type: "text",
					value: member.address3 || ""
				})
			]),
			h("p", [
				h("span.info", "Address 4: "),
				h("input#edit-member-address3", {
					type: "text",
					value: member.address3 || ""
				})
			]),
			h("p", [
				h("span.info", "County: "),
				h("input#edit-member-county", {
					type: "text",
					value: member.county || ""
				})
			]),
			h("p", [
				h("span.info", "Postcode: "),
				h("input#edit-member-postcode", {
					type: "text",
					value: member.postcode || ""
				})
			]),
			h("p", [
				h("span.info", "Deliverer: "),
				h("input#edit-member-deliverer", {
					type: "text",
					value: member.deliverer || ""
				})
			]),
			h("p", [
				h("span.info", "Home phone: "),
				h("input#edit-member-home-phone", {
					type: "text",
					value: member.homePhone || ""
				})
			]),
			h("p", [
				h("span.info", "Work phone: "),
				h("input#edit-member-work-phone", {
					type: "text",
					value: member.workPhone || ""
				})
			]),
			h("p", [
				h("span.info", "Mobile phone: "),
				h("input#edit-member-mobile-phone", {
					type: "text",
					value: member.mobilePhone || ""
				})
			])
		]);
	}

	function renderMembership (member) {

		return h("div.col-3", [
			h("h2", "Membership info"),
			h("p", [
				h("span.info", "Membership type: "),
				h("select", renderOptionsSelected(memberTypes, member.membershipType, "Membership type"))
			]),
			h("p", [
				h("span.info", "Date joined: "),
				h("input#edit-member-date-joined", {
					type: "text",
					value: utils.moment(member.dateJoined).format("DD-MM-YYYY") || ""
				})
			]),
			h("p", [
				h("span.info", "Life payment date: "),
				h("input#edit-member-life-payment-date", {
					type: "text",
					value: utils.moment(member.lifePaymentDate).format("DD-MM-YYYY") || ""
				})
			]),
			h("p", [
				h("span.info", "Date GAD Signed: "),
				h("input#edit-member-date-gift-aid-signed", {
					type: "text",
					value: utils.moment(member.dateGiftAidSigned).format("DD-MM-YYYY") || ""
				})
			]),
			// h("p", [
			// 	h("span.info", "Date GAD Signed: "),
			// 	h("input#edit-member-date-gift-aid-signed", {
			// 		type: "text",
			// 		value: utils.moment(member.dateGiftAidSigned).format("DD-MM-YYYY") || ""
			// 	})
			// ]),
			h("p", [
				h("span.info", "Due date: "),
				h("input#edit-member-due-date", {
					type: "text",
					value: utils.moment(member.dueDate).format("DD-MMM") || ""
				})
			]),
			h("p", [
				h("span.info", "Notes: "),
				h("input#edit-member-notes", {
					type: "text",
					value: member.membershipNotes || ""
				})
			]),


			// renderGiftAid(member),
			// renderDateGiftAidCancelled(member),
			// check("Standing order: ", member.standingOrder),
			// renderRegistered(member),
		]);
	}

	/**
	 *	Renders a list of options with one selected;
	 *
	 *	@param {Array}  - array of objects like: {value: "string", description: "string"}
	 *	@param {String} - value or description to be selected from options
	 *	return {Object} - virtual dom object
	 */
	function renderOptionsSelected (options, selectedOption, placeholder) {

		var firstPlaceholderOption = [
			h("option", {
				value: "",
				disabled: true
			}, placeholder)
		];

		return firstPlaceholderOption.concat(
			options.map(function (elm){
				var selected = (elm.value === selectedOption || elm.description === selectedOption);

				return h("option", {
					value:    elm.value,
					selected: selected
				}, elm.description);
			})
		);
	}

};