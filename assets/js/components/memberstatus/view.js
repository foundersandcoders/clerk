"use strict";

var h = require("virtual-dom/h");

module.exports = function (status, deleteFn, reactivateFn) {

	var deletionReasons = [{
			value:      "deceased",
			description: "Deceased"
		},{
			value: "notResponding",
			description: "Did not respond to reminders"
		},{
			value: "duplicate",
			description: "Duplicate"
		}, {
			value: "dissatisfied",
			description: "Expressed dissatisfaction"
		},{
			value: "mailReturned",
			description: "Mail returned to us"
		}, {
			value: "moved",
			description: "Moved away"
		},{
			value: "notifiedTermination",
			description: "Notified termination"
		}, {
			value: "other",
			description: "Other"
		}
	];


	return h("div.member-buttons", [
		h("div.button#newmember-button", [
			h("a", {
				href: "/addmember"
			}, "Save changes")
		]),
		renderStatus(status)
	]);


	function renderStatus (status) {

		var active = h("div#delete", [
			h("select#deletion-reason", renderOptions(deletionReasons)),
			h("div#maintenance-button.button", {
				onclick: deleteFn
			}, "Delete member")
		]);

		var deleted = h("div#active", [
			h("div#maintenance-button.button", {
				onclick: reactivateFn
			},  "Reactivate member")
		]);

		if(status === "active"){
			return active;
		}else{
			return deleted;
		}

	}

	function renderOptions(reasons){

		var options = [
			h("option", {
				value: "",
				disabled: true,
				selected: true
			},"Deletion reason")
		];

		return options.concat(
			reasons.map(function (elm){

				return h("option", {
					value: elm.value
				}, elm.description)
			})
		);
	}
};