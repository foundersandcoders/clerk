"use strict";

var h = require("virtual-dom/h");

module.exports = function (status, updateType, deleteFn, reactivateFn) {

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

	return h("div#status-controls", [
		renderStatus(status)
	]);

	// function renderType () {
	// 	return h("div.member-type-section", [
	// 		h("div.title-ctrl", [
	// 			h("p", "Change membership"),
	// 		]),
	// 		h("div.body-ctrl", [
	// 			h("select#member-type", renderOptions("Change Type", memberTypes)),
	// 			h("button.button-two.m-l-15",{
	// 				onclick: updateType
	// 			}, "Save")
	// 		])
	// 	])
	// }


	function renderStatus (status) {

		var active = h("div.delete-section", [
			h("div.title-ctrl", [
				h("p", "Delete member"),
			]),
			h("div.body-ctrl", [
				h("select#deletion-reason", renderOptions("Deletion reason", deletionReasons)),
				h("button.button-two.button-c.m-l-15.red", {
					onclick: deleteFn
				}, "Delete")
			])
		]);

		var deleted = h("div.delete-section", [
			h("div.title-ctrl", [
				h("p", "Reactivate member"),
			]),
			h("div.body-ctrl", [
				h("button.button-two.button-c.m-l-15.red", {
					onclick: reactivateFn
				},  "Reactivate")
			])
		]);

		if(status === "active"){
			return active;
		}else{
			return deleted;
		}
	}

	function renderOptions(placeholder, reasons){

		var options = [
			h("option", {
				value: "",
				disabled: true,
				selected: true
			}, placeholder)
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