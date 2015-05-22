"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(state.member(), utils);
	};

	that.getData = function () {

		utils.request(utils.createOpts("GET"), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
		});
	};

	that.putDate = function () {

		try {
			var payload = {
				// info
				title:          $$("edit-member-title").value(),
				initials:       $$("edit-member-initials").value(),
				firstName:      $$("edit-member-first-name").value(),
				lastName:       $$("edit-member-last-name").value(),
				primaryEmail:   $$("edit-member-primary-email").value(),
				secondaryEmail: $$("edit-member-secondary-email").value(),
				newsType:       $$("edit-member-news-type").valSelect(),
				// address
				address1:    $$("edit-member-address-line").value(),
				address2:    $$("edit-member-town-or-city").value(),
				county:      $$("edit-member-county").value(),
				postcode:    $$("edit-member-postcode").value(),
				homePhone:   $$("edit-member-home-phone").value(),
				workPhone:   $$("edit-member-work-phone").value(),
				mobilePhone: $$("edit-member-mobile-phone").value(),
				// membership
				membershipType:    $$("edit-member-membership-type").valSelect(),
				dateJoined:        $$("edit-member-date-joined").value(),
				lifePaymentDate:   $$("edit-member-life-payment-date").value(),
				registered:        $$("edit-member-status-online").checkedValue(),
				giftAidSigned:     $$("edit-member-gift-aid-signed").checkedValue(),
				dateGiftAidSigned: $$("edit-member-date-gift-aid-signed").value(),
				standingOrder:     $$("edit-member-standing-order").checkedValue(),
				notes:             $$("edit-member-notes").value()
			};
		} catch (e) {
			console.log("Error in updating details: ", e);
		}

		utils.request(utils.createOpts("PUT", payload), function (e, h, b) {

			// check if b is object, if not, try and JSON.parse it.
			state.member.set(b);
			that.toggleMode();
		});
	};

	that.getData();

	return that;
};