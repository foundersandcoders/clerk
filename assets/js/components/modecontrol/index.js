"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var $$   = utils.$$;
	var that = {};

	that.render = function (member) {

		return view(that.toggleMode, that.putData, state.mode());
	};

	that.putData = function () {

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

		utils.request(utils._createOptions(payload), function (e, h, b) {

			// check if b is object, if not, try and JSON.parse it.
			state.member.set(b);
			that.toggleMode();
		});
	};

	that.toggleMode = function () {

		var mode = (state.mode() === "edit") ? "view" : "edit";
		state.mode.set(mode);
	}

	return that;
};

function _createOptions (payload) {

	try{
		var id = document.querySelector("#member-id").textContent;
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	return {
		method: "PUT",
		url: "/api/members/" + id,
		json: payload
	}
}