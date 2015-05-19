var moment = require("moment");

var member = function (id, firstName, lastName, status, date, registered) {

	var that = {};

	that.id         = (id        || Math.round(Math.random()*1000000)).toString();
	that.firstName  = firstName || "Besart";
	that.lastName   = lastName  || "Hoxhaj";
	that.initials   = "B J H";
	that.title      = "Mr.";
	that.news       = "Post";
	that.email1     = "besartshyti@gmail.com";
	that.status     = status || "active";
	that.dateJoined = date || moment().format("DD-MM-YYYY");
	that.registered = registered || "unregistered";

	that.fullName  = that.title + " " + that.firstName + " " + that.initials + " " + that.lastName;

	return that;
};

module.exports.member = member;