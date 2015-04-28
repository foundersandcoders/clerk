"use strict";

module.exports = {
	manageMember: manageMember,
	addMember:    addMember,
	showMember:   showMember
};

function manageMember (){

	var that         = {};

	that.addBtn      = "#add-member";
	that.searchInput = "#serach-member";
	that.serachBtn   = "#serach-field";

	return that;
}

function addMember (){

	var that       = {};

	that.id        = "#id";
	that.firstName = "#first-name";
	that.lastName  = "#last-name";
	that.title     = "#title";
	that.birthday  = "#birthday";
	that.submitBtn = "#create-member-btn";

	return that;
}

function showMember (){

	var that       = {};

	that.id        = "#id";
	that.firstName = "#first-name";
	that.lastName  = "#last-name";
	that.title     = "#title";
	that.birthday  = "#birthday";

	return that;
}