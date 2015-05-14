"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, utils) {



	return h("div.individual-section", [
		renderPersonalInfo(data),
		// renderAddressInfo(data),
		// renderMembership(data)
	]);

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("h2", "Personal info"),
			h("p", [
				h("span.info", "Name: "),
				h("span", fullName.call(member))
			]),
			h("p", [
				h("span.info", "Member id: "),
				h("span", member.id)
			]),
			check("Birthday: ", member.birthday),
			checkEmail(member),
			// if(member.email1 || member.email2) {
			// 	h("p", [
			// 		h("span.info", "Emails:"),
			// 		if(member.email1){
			// 			h("p", "Primary: " + member.email1)
			// 		}
			// 		if(member.email2){
			// 			h("p", "Secondary: " + member.email2)
			// 		}
			// 	]),
			// 	h("p", [
			// 		h("span.info", "Bounced: "),
			// 		h("span", (member.emailBounced) ? "Yes" : "No")
			// 	]),
			// }
			// h("p", [
			// 	h("span.info", "Online: "),
			// 	h("span", (member.onlineMember) ? "Yes" : "No")
			// ]),
			// h("p", [
			// 	h("span.info", "Status: "),
			// 	h("span", member.status)
			// ]),
			// if(member.status === "deleted") {
			// 	h("p", [
			// 		h("span.info", "Deletion date: "),
			// 		h("span", member.deletionDate)
			// 	]),
			// 	h("p", [
			// 		h("span.info", "Deletion reason: "),
			// 		h("span", member.deletionReason)
			// 	]),
			// }
		]);
	}

	// function renderAddressInfo (member) {

	// 	return h("div.col-2", [
	// 		h("h2", "Address info"),
	// 		if(member.address1)  {h("p", member.address1), }
	// 		if(member.address2)  {h("p", member.address2), }
	// 		if(member.address3)  {h("p", member.address3), }
	// 		if(member.address4)  {h("p", member.address4), }
	// 		if(member.county)    {h("p", member.county),   }
	// 		if(member.postcode)  {h("p", member.postcode), }
	// 		if(member.deliverer) {h("p", member.deliverer),}
	// 	]);
	// }

	// function renderMembership (member) {
		
	// 	return h("div.col-3", [
	// 		h("h2", "Membership info"),
	// 		h("p", [
	// 			h("span.info", "Date joined: "),
	// 			h("span", utils.moment(member.dateJoined).format("DD-MM-YYYY"))
	// 		]),
	// 		h("p", [
	// 			h("span.info", "Membership type: "),
	// 			h("span", member.membershipType)
	// 		]),
	// 		// if the member choose from the beginning life
	// 		if(member.membershipType === "life-double" || member.membershipType === "life-single") {
	// 			h("p", [
	// 				h("span.info", "Life payment date: "),
	// 				h("span", member.lifePaymentDate)
	// 			]),
	// 		}
	// 		// if the member changed from normal to life
	// 		if(member.dateTypeChanged && (member.membershipType === "life-double" || member.membershipType === "life-single")) {
	// 			h("p", [
	// 				h("span.info", "Life payment date: "),
	// 				h("span", member.lifePaymentDate)
	// 			]),
	// 			h("p", [
	// 				h("span.info", "Membership changed date: "),
	// 				h("span", member.dateTypeChanged)
	// 			]),
	// 		}
	// 		if(member.giftAid){
	// 			h("p", [
	// 				h("span", "Gift Aid: "),
	// 				h("p", "Signed: Yes"),
	// 				h("p", "Signed date: " + utils.moment(member.dateGiftAidSigned)..format("DD-MM-YYYY")),
	// 			]),
	// 		}
	// 		if(member.dateGiftAidCancelled) {
	// 			h("p", "Cancelled: Yes"),
	// 		}
	// 		h("p", [
	// 			h("span.info", "Standing order: "),
	// 			h("span", member.standingOrder)
	// 		])
	// 	]);
	// }

	function check (name, elm) {
		if(elm) {
			return h("p", [
				h("span.info", name),
				h("span", elm)
			])
		}
	}

	function checkSingle (name, elm) {
		if(elm){
			return h("p", name + elm);
		}
	}

	function checkEmail (member) {
		if(member.email1 || member.email2) {
			return h("p", [
				h("span.info", "Emails:"),
				checkSingle("Primary: ", member.email1),
				checkSingle("Secondary: ", member.email2),
			]),
			h("p", [
				h("span.info", "Bounced: "),
				h("span", (member.emailBounced) ? "Yes" : "No")
			]);
		}
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