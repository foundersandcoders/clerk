"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, utils) {

	var deletionReasons       = require("../helpers").deletionReasons;
	var renderOptionsSelected = require("../helpers").renderOptionsSelected;

	return ([
		h("div.member-info-controls", [
			whichMode()
		]),
		h("div.member-info-content", [
			renderPersonalInfo(data),
			renderAddressInfo(data),
			renderMembership(data)
		])
	]);

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("h2", "Personal info"),
     		check("Name: ", fullName.call(member)),
      		check("ID: ", member.id),
			check("Primary email: ", member.primaryEmail),
			check("Secondary email: ", member.secondaryEmail),
      		check("Bounced email: ", member.emailBounced),
      		check("News: ", (member.newsType === "post" ? "Post" : "Online")),
      		check("Status: ", member.status),
			deletedInfo(member)
		]);
	}

	function renderAddressInfo (member) {

		return h("div.col-2", [
			h("h2", "Address info"),
			check("Address line: ", member.address1),
			check("Town or City: ", member.address2),
			check("County: ", member.county),
			check("Postcode: ", member.postcode),
			check("Deliverer: ", member.deliverer),
			check("Home phone: ", member.homePhone),
			check("Work phone: ", member.workPhone),
			check("Mobile phone: ", member.mobilePhone)
		]);
	}

	function renderMembership (member) {

		return h("div.col-3", [
			h("h2", "Membership info"),
      		check("Date joined: ", utils.moment(member.dateJoined).format("DD-MM-YYYY")),
      		check("Membership type: ", replaceNice.call(null, (member.membershipType || ""))),
			renderMembershipLife(member),
			renderMembershipLifeChanged(member),
			renderGiftAid(member),
			renderDateGiftAidCancelled(member),
			check("Standing order: ", (member.standingOrder) ? "Yes" : "No" ),
			check("Notes: ", member.notes),
			check("Status online: ", (member.registered ? "Registered" : "Unregistered")),
			check("Due date: ", utils.moment(member.dueDate).format("DD-MMM"))
		]);
	}

	function whichMode () {
		// if (mode === "edit") {
			return [
				h("button#edit-member-save.button-two.m-l-15.w-100",{
					// onclick: putFn
				}, "Save"),
				h("button#edit-member-cancel.button-two.m-l-15.w-100",{
					// onclick: toggleFn
				}, "Cancel"),
				h("button.button-two.button-c.m-l-15.red.w-100", {
					// onclick: deleteFn
				}, "Delete"),
				h("select#deletion-reason.w-200", renderOptionsSelected(deletionReasons, null, "Deletion reason")),
			]
		// } else {
		// 	return [
		// 		h("button#edit-member-mode.button-two.m-l-15.right.w-100",{
		// 			// onclick: toggleFn
		// 		}, "Edit")
		// 	]
		// }
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

    return check("Status: ", (member.online) ? "Registered" : "Unregistered" );
	}

	function renderMembershipLifeChanged (member) {
		if(member.dateTypeChanged && (member.membershipType === "life-double" || member.membershipType === "life-single")) {
      		return h("p", [
        		check("Life payment date: ", member.lifePaymentDate),
        		check("Membership date changed: ", member.dateTypeChanged)
      		]);
		}
	}

	function renderMembershipLife (member) {
		if(member.membershipType === "life-double" || member.membershipType === "life-single") {
      		return check("Life payent date: ", member.lifePaymentDate);
		}
	}

	function renderGiftAid (member) {
		if(member.giftAid){
      		return check("GAD Signed: ", utils.moment(member.dateGiftAidSigned).format("DD-MM-YYYY"));
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
        		check("Deletion date:", utils.moment(member.deletionDate).format("DD-MM-YY")),
        		check("Deletion reason: ", member.deletionReason)
			]);
		}
	}

	function replaceSpaceColon (){

		return this.toLowerCase().replace(" ", "-").replace(":", "");
	}

	function replaceNice (string) {

		return string.replace("-", " ").split(" ").map(function (elm){
			return elm.charAt(0).toUpperCase() + elm.slice(1);
		}).join(" ");
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