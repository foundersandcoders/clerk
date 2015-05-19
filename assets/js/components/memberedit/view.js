"use strict";


var h = require("virtual-dom/h");


module.exports = function (data, utils) {
	
	var memberTypes = [{
			value: "annual-single",
			description: "Annual Single"
		}, {
			value: "annual-double",
			description: "Annual Double"
		},{
			value: "annual-family",
			description: "Annual Family"
		},{
			value: "life-single",
			description: "Life Single"
		},{
			value: "life-double",
			description: "Life Double"
		},{
			value: "group-annual",
			description: "Group Annual"
		},{
			value: "corporate-annual",
			description: "Corporate Annual"
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
			check("Title: ", member.title),
			check("Initials: ", member.initials),
			check("First name: ", member.firstName),
			check("Last name: ", member.lastName),
      		check("Member id: ", member.id),
			check("Primary email: ", member.email1),
			check("Secondary email: ", member.email2),
      		check("Bounced email: ", member.emailBounced),
      		h("p", [
				h("span.info", "News: "),
				renderOnlineStatus(member)
			]),
      		check("Status: ", member.status),
			deletedInfo(member)
		]);
	}

  	function renderOnlineStatus (member) {
  		return h("select", [
	        h("option", {
	          	selected: !!(member.onlineMember)
	        }, "Online"),
	        h("option", {
	            selected: !(member.onlineMember)
	        }, "Post")
      	]);
  	}

	function renderType () {
		return h("select#member-type", renderOptions("Change Type", memberTypes, data));
	}

	function renderOptions(placeholder, reasons, member){

		var options = [
			h("option", {
				value: "",
				disabled: true
			}, placeholder)
		];

		return options.concat(
			reasons.map(function (elm){

				var selected = (member.membershipType === elm.value || member.membershipType === elm.description);

				return h("option", {
					value: elm.value,
					selected: selected
				}, elm.description)
			})
		);
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
      		check("Date joined: ", utils.moment(member.dateJoined).format("DD-MM-YYYY")),
      		renderType(),
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
			    h("input#view-member-" + replaceSpaceColon.call(name), {
			    	type: "text",
			    	value: elm
			    })
            ]);
		}
	}

	function checkSingle (name, elm) {
		if(elm){
        	return h("input#view-member-" + replaceSpaceColon.call(name), {
        		type: "text",
        		value: elm
        	});
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

	function fullName () {
		var store = [];

		if(utils.is.ok(this.title)    ) {store.push(this.title)}
		if(utils.is.ok(this.firstName)) {store.push(this.firstName)}
		if(utils.is.ok(this.initials) ) {store.push(this.initials)}
		if(utils.is.ok(this.lastName) ) {store.push(this.lastName)}

		return store.join(" ");
	}
};