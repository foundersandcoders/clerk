"use strict";


var view = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(state.member().status, that.updateType, that.deleteMember, that.reactivate);
	};

	that.updateType = function () {
		var selectElm = document.querySelector("select#member-type");

		var payload = {
			membershipType: selectElm.options[selectElm.selectedIndex].value
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			var member = state.member();
			member.membershipType = b.membershipType;
			state.member.set(member);
		});
	}

	that.deleteMember = function () {

		var selectElm = document.querySelector("#deletion-reason");

		var payload = {
			deletionDate: utils.moment(),
			deletionReason: selectElm.options[selectElm.selectedIndex].value,
			status: "deleted"
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			var member = state.member();
			member.status = b.status;
			member.deletionReason = b.deletionReason;
			member.deletionDate = b.deletionDate;
			state.member.set(b);
		});
	}

	that.reactivate = function () {

		var payload = {
			deletionReason: [],
			status: "active"
		};

		utils.request(_createOptions(payload), function (e, h, b) {

			var member = state.member();
			member.status = b.status;
			state.member.set(member);
		});
	}

	function _createOptions (payload) {

		try {
			var id = document.querySelector("#member-id").textContent
		} catch (e) {
			console.log("Error id: ", e);
		}

		return {
			method: "PUT",
			url: "/api/members/" + id,
			json: payload
		};
	}

	return that;
};