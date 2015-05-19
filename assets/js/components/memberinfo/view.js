"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, utils) {

	// return h("div.individual-section", [
	return ([
		renderPersonalInfo(data),
		renderAddressInfo(data),
		renderMembership(data)
	]);

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("h2", "Personal info"),
			h("p", [
				h("span.info", "Name: "),
				h("span#view-member-full-name", fullName.call(member))
			]),
			h("p", [
				h("span.info", "Member id: "),
				h("span#view-member-id", member.id)
			]),
			check("Primary email: ", member.email1),
			check("Secondary email: ", member.email2),
			h("p", [
				h("span.info", "Bounced email: "),
				h("span#view-member-email-bounced", member.emailBounced),
			]),
			h("p", [
				h("span.info", "News: "),
				h("span#view-member-news", (member.onlineMember) ? "Online" : "Post")
			]),
			h("p", [
				h("span.info", "Status: "),
				h("span#view-member-status", member.status)
			]),
			deletedInfo(member)
		]);
	}

	function renderAddressInfo (member) {

		return h("div.col-2", [
			h("h2", "Address info"),
			checkSingle("", member.address1),
			checkSingle("", member.address2),
			checkSingle("", member.address3),
			checkSingle("", member.address4),
			checkSingle("", member.county),
			checkSingle("", member.postcode),
			checkSingle("", member.deliverer),
			check("Home phone: ", member.homePhone),
			check("Work phone: ", member.workPhone),
			check("Mobile phone: ", member.mobilePhone)
		]);
	}

	function renderMembership (member) {
		
		return h("div.col-3", [
			h("h2", "Membership info"),
			h("p", [
				h("span.info", "Date joined: "),
				h("span#view-member-date-joined", utils.moment(member.dateJoined).format("DD-MM-YYYY"))
			]),
			h("p", [
				h("span.info", "Membership type: "),
				h("span#view-member-membership-type", member.membershipType)
			]),
			renderMembershipLife(member),
			renderMembershipLifeChanged(member),
			renderGiftAid(member),
			renderDateGiftAidCancelled(member),
			check("Standing order: ", member.standingOrder),
			check("Notes:", member.membershipNotes),
			renderRegistered(member),
			check("Due date: ", utils.moment(member.dueDate).format("DD-MMM"))
		]);
	}

	function check (name, elm) {
		if(elm) {
			return h("p", [
				h("span.info", name),
				h("span#view-member-" + replaceSpaceColon.call(name), elm)
			]);
		}
	}

	function checkSingle (name, elm) {
		if(elm){
			return h("p#view-member-" + replaceSpaceColon.call(name), name + elm);
		}
	}

	function renderRegistered (member) {

		return h("p", [
			h("span.info", "Status: "),
			h("span#view-member-status-online", (member.online) ? "registered" : "unregistered")
		]);
	}

	function renderMembershipLifeChanged (member) {
		if(member.dateTypeChanged && (member.membershipType === "life-double" || member.membershipType === "life-single")) {
			return h("p", [
				h("span.info", "Life payment date: "),
				h("span#view-member-date-life-payment-date", member.lifePaymentDate)
			]),
			h("p", [
				h("span.info", "Membership changed date: "),
				h("span#view-member-date-type-changed", member.dateTypeChanged)
			]);
		}
	}

	function renderMembershipLife (member) {
		if(member.membershipType === "life-double" || member.membershipType === "life-single") {
			return h("p", [
				h("span.info", "Life payment date: "),
				h("span#view-member-membership-life", member.lifePaymentDate)
			]);
		}
	}

	function renderGiftAid (member) {
		if(member.giftAid){
			return h("p", [
				h("span.info", "GAD Signed: "),
				h("span#view-member-date-gift-signed", utils.moment(member.dateGiftAidSigned).format("DD-MM-YYYY"))
			]);
		}
	}

	function renderDateGiftAidCancelled (member) {
		if(member.dateGiftAidCancelled) {
			return h("p", [
				check("GAD cancelled: ", utils.moment(member.dateGiftAidCancelled).format("DD-MM-YYYY"))
			]);
		}
	}

	function deletedInfo (member) {
		if(member.status === "deleted") {
			return h("span", [
				h("p", [
					h("span.info", "Deletion date: "),
					h("span", utils.moment(member.deletionDate).format("DD-MM-YY"))
				]),
				h("p", [
					h("span.info", "Deletion reason: "),
					h("span", member.deletionReason)
				])
			]);
		}
	}

	function replaceSpaceColon (){
		return this.toLowerCase().replace(" ", "-").replace(":", "");
	}

	function fullName () {
		var store = [];

		if(utils.is.ok(this.title)    ) {store.push(this.title)}
		if(utils.is.ok(this.firstName)) {store.push(this.firstName)}
		if(utils.is.ok(this.initials) ) {store.push(this.initials)}
		if(utils.is.ok(this.lastName) ) {store.push(this.lastName)}

		return store.join(" ");
	}
};