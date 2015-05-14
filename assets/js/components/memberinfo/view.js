"use strict";

var h = require("virtual-dom/h");

module.exports = function (data) {



	return h("div.individual-section", [
		renderPersonalInfo(data),
		renderAddressInfo(data),
		renderMembership(data)
	]);

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("p", [
				h("span.info", "Name"),
				h("span", fullName.call(member))
			]),
			h("p", [
				h("span.info", "Member id:"),
				h("span", member.id)
			]),
			if(member.birthday) {
				h("p", [
					h("span.info", "Birthday:"),
					h("span", member.birthday)
				]),
			}
			if(member.email1 || member.email2) {
				h("p", [
					h("span.info", "Emails:"),
					if(member.email1){
						h("p", "Primary: " + member.email1)
					}
					if(member.email2){
						h("p", "Secondary: " + member.email2)
					}
				]),
				h("p", [
					h("span.info", "Bounced: "),
					h("span", (member.emailBounced) ? "Yes" : "No")
				]),
			}
			h("p", [
				h("span.info", "Online: "),
				h("span", (member.onlineMember) ? "Yes" : "No")
			]),
			h("p", [
				h("span.info", "Status: "),
				h("span", member.status)
			]),
			if(member.status === "deleted") {
				h("p", [
					h("span.info", "Status: "),
					h("span", member.status)
				]),
			}
		]);
	}

	function renderAddressInfo (member) {

		return h("div.col-2", [

		]);
	}

	function renderMembership (member) {
		
		return h("div.col-3", [

		]);
	}

	function fullName () {
		var store = [];

		is.ok(this.title)     ? store.push(this.title)     : false;
		is.ok(this.firstName) ? store.push(this.firstName) : false;
		is.ok(this.initials)  ? store.push(this.initials)  : false;
		is.ok(this.lastName)  ? store.push(this.lastName)  : false;

		return store.join(" ");
	}
};