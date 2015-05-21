var moment = require("moment");

function member (id, firstName, lastName, status, date, registered) {

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


function payment (prot) {

  var prot = prot || {};
  var that = {};

  that.date          = prot.date          || "11/08/2013";
  that.type          = prot.type          || "CASH";
  that.listReference = prot.listReference || "INV1234";
  that.total         = prot.total         || 25;
  that.notes         = prot.notes         || "Payment for membership";

  return that;
}

module.exports.member = member;
module.exports.payment = payment;
