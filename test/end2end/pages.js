var Navbar = function (){

	this.home        = element(by.id("nav-home"));
	this.signup      = element(by.id("nav-signup"));
	this.login       = element(by.id("nav-login"));
	this.logout      = element(by.id("nav-logout"));
	this.addMember   = element(by.id("nav-add-member"));
	this.maintenance = element(by.id("nav-data-maintenance"));
	this.reports     = element(by.id("nav-reports"));
	this.emails      = element(by.id("nav-emails"));
};

var SignUp = function (){

	this.email          = element(by.id("email"));
	this.password       = element(by.id("password"));
	this.cpassword      = element(by.id("cpassword"));
	this.submit         = element(by.id("button_sign_up"));
};

var SignIn = function (){

	this.email          = element(by.id("email"));
	this.password       = element(by.id("password"));
	this.submit         = element(by.id("button_sign_in"));
};

var Admin = function (){
	this.newMemberButton = element(by.id("nav-add-member"));
};

var CreateMember = function () {

	var page = "add";

	this.id        = element(by.id(page + "-member-id"));
	this.firstName = element(by.id(page + "-member-first-name"));
	this.initials  = element(by.id(page + "-member-initials"));
	this.lastName  = element(by.id(page + "-member-last-name"));
	this.title     = element(by.id(page + "-member-title"));
	this.address1  = element(by.id(page + "-member-address1"));
	this.address2  = element(by.id(page + "-member-address2"));
	this.address3  = element(by.id(page + "-member-address3"));
	this.address4  = element(by.id(page + "-member-address4"));
	this.county    = element(by.id(page + "-member-county"));
	this.postcode  = element(by.id(page + "-member-postcode"));
	this.deliverer = element(by.id(page + "-member-deliverer"));
	this.homePhone = element(by.id(page + "-member-home-phone"));

	this.mobilePhone          = element(by.id(page + "-member-mobile-phone"));
	this.workPhone            = element(by.id(page + "-member-work-phone"));
	this.email1               = element(by.id(page + "-member-email1"));
	this.email2               = element(by.id(page + "-member-email2"));
	this.dateJoined           = element(by.id(page + "-member-date-joined"));
	this.lifePaymentDate      = element(by.id(page + "-member-life-payment-date"));
	this.membershipDue        = element(by.id(page + "-membership-due-date"));
	this.giftAidSignedDate    = element(by.id(page + "-member-date-gift-aid-signed"));
	this.giftAidCancelledDate = element(by.id(page + "-member-date-gift-cancelled"));
	this.notes                = element(by.id(page + "-member-membership-notes"));

	this.createButton = element(by.id("create-member-btn"));
	this.cancelButton = element(by.id("cancel-member-btn"));
};

var ViewMember = function () {

	var page = "view";

	this.id        = element(by.id(page + "-member-id"));
	this.fullName  = element(by.id(page + "-member-full-name"));
	this.news      = element(by.id(page + "-member-news"));
	this.status    = element(by.id(page + "-member-status"));

	this.registered = element(by.id("view-member-status-online"));

	this.address1  = element(by.id(page + "-member-address1"));
	this.address2  = element(by.id(page + "-member-address2"));
	this.address3  = element(by.id(page + "-member-address3"));
	this.address4  = element(by.id(page + "-member-address4"));
	this.county    = element(by.id(page + "-member-county"));
	this.postcode  = element(by.id(page + "-member-postcode"));
	this.deliverer = element(by.id(page + "-member-deliverer"));
	this.homePhone = element(by.id(page + "-member-home-phone"));

	this.mobilePhone          = element(by.id(page + "-member-mobile-phone"));
	this.workPhone            = element(by.id(page + "-member-work-phone"));
	this.email1               = element(by.id(page + "-member-primary-email"));
	this.email2               = element(by.id(page + "-member-secondary-email"));
	this.dateJoined           = element(by.id(page + "-member-date-joined"));
	this.lifePaymentDate      = element(by.id(page + "-member-life-payment-date"));
	this.membershipDue        = element(by.id(page + "-membership-due-date"));
	this.giftAidSignedDate    = element(by.id(page + "-member-date-gift-aid-signed"));
	this.giftAidCancelledDate = element(by.id(page + "-member-date-gift-cancelled"));
	this.notes                = element(by.id(page + "-member-membership-notes"));
};

// pages
module.exports.Navbar       = Navbar;
module.exports.SignUp       = SignUp;
module.exports.SignIn       = SignIn;
module.exports.Admin        = Admin;
module.exports.CreateMember = CreateMember;
module.exports.ViewMember   = ViewMember;


