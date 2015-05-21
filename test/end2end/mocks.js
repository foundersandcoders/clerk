var moment = require("moment");

var member = module.exports.member = function (id, firstName, lastName, status, date, registered) {

	var that = {};

	that.id             = (id        || Math.round(Math.random()*1000000)).toString();
	that.firstName      = firstName || "Besart";
	that.lastName       = lastName  || "Hoxhaj";
	that.initials       = "B J H";
	that.title          = "Mr.";
	that.primaryEmail   = "primary@email.com";
	that.secondaryEmail = "secondary@email.com";
	that.status         = status || "active";

	that.address1       = "Virtual Road D3";
	that.address2       = "Mercury";
	that.county         = "Bobland";
	that.postcode       = "314159";
	that.deliverer      = "";

	that.homePhone      = "1111-2222-3333";
	that.workPhone      = "2222-1111-3333";
	that.mobilePhone    = "3333-1111-2222";

	that.membershipType    = "Annual Double";
	that.dateJoined        = "12-12-2012";
	that.giftAidSignedDate = "12-12-2014";
	that.notes             = "Nice dude.";
	that.newsType          = "Post";

	that.fullName  = that.title + " " + that.firstName + " " + that.initials + " " + that.lastName;

	return that;
};