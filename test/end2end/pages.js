var Navbar = module.exports.Navbar = function (){

	this.home        = element(by.id("nav-home"));
	this.signup      = element(by.id("nav-signup"));
	this.login       = element(by.id("nav-login"));
	this.logout      = element(by.id("nav-logout"));
	this.addMember   = element(by.id("nav-add-member"));
	this.maintenance = element(by.id("nav-data-maintenance"));
	this.reports     = element(by.id("nav-reports"));
	this.emails      = element(by.id("nav-emails"));
};

var SignUp = module.exports.SignUp = function (){

	this.email          = element(by.id("email"));
	this.password       = element(by.id("password"));
	this.cpassword      = element(by.id("cpassword"));
	this.submit         = element(by.id("button_sign_up"));
};

var SignIn = module.exports.SignIn = function (){

	this.email          = element(by.id("email"));
	this.password       = element(by.id("password"));
	this.submit         = element(by.id("button_sign_in"));
};

var Admin = module.exports.Admin = function (){
	this.newMemberButton = element(by.id("nav-add-member"));
};

var CreateMember = module.exports.CreateMember = function () {

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
	this.primaryEmail         = element(by.id(page + "-member-email1"));
	this.secondaryEmail       = element(by.id(page + "-member-email2"));

	this.membershipType       = element(by.id(page + "-member-membership-type"));
	this.dateJoined           = element(by.id(page + "-member-date-joined"));
	this.lifePaymentDate      = element(by.id(page + "-member-life-payment-date"));
	this.membershipDue        = element(by.id(page + "-membership-due-date"));
	this.giftAidSigned        = element(by.id(page + "-member-gift-aid-signed"));
	this.giftAidSignedDate    = element(by.id(page + "-member-date-gift-aid-signed"));
	this.giftAidCancelledDate = element(by.id(page + "-member-date-gift-cancelled"));
	this.newsType             = element(by.id(page + "-member-news-type"));
	this.notes                = element(by.id(page + "-member-membership-notes"));

	this.createButton = element(by.id("create-member-btn"));
	this.cancelButton = element(by.id("cancel-member-btn"));
};

var ViewMember = module.exports.ViewMember = function () {

	var page = "view";

	this.id        = element(by.id(page + "-member-id"));
	this.fullName  = element(by.id(page + "-member-name"));
	this.news      = element(by.id(page + "-member-news"));
	this.status    = element(by.id(page + "-member-status"));

	this.address1  = element(by.id(page + "-member-address1"));
	this.address2  = element(by.id(page + "-member-address2"));
	this.address3  = element(by.id(page + "-member-address3"));
	this.address4  = element(by.id(page + "-member-address4"));
	this.county    = element(by.id(page + "-member-county"));
	this.postcode  = element(by.id(page + "-member-postcode"));
	this.deliverer = element(by.id(page + "-member-deliverer"));
	this.homePhone = element(by.id(page + "-member-home-phone"));

	this.registered           = element(by.id(page + "-member-status-online"));
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

var EditMember = module.exports.EditMember = function () {

	var page = "edit-member";

	// Personal info
	this.id           = element(by.id(page + "-id"));
	this.title        = element(by.id(page + "-title"));
	this.initials     = element(by.id(page + "-initials"));
	this.firstName    = element(by.id(page + "-first-name"));
	this.lastName     = element(by.id(page + "-last-name"));
	this.email1       = element(by.id(page + "-primary-email"));
	this.email2       = element(by.id(page + "-secondary-email"));
	this.news         = element(by.id(page + "-method-news-receive"));
	this.status       = element(by.id(page + "-status"));
	this.reasonDel    = element(by.id(page + "-deletion-reason"));
	this.delationDate = element(by.id(page + "-deletion-date"));

	// address info
	this.address1    = element(by.id(page + "-address1"));
	this.address2    = element(by.id(page + "-address2"));
	this.address3    = element(by.id(page + "-address3"));
	this.address4    = element(by.id(page + "-address4"));
	this.county      = element(by.id(page + "-county"));
	this.postcode    = element(by.id(page + "-postcode"));
	this.deliverer   = element(by.id(page + "-deliverer"));
	this.homePhone   = element(by.id(page + "-home-phone"));
	this.mobilePhone = element(by.id(page + "-mobile-phone"));
	this.workPhone   = element(by.id(page + "-work-phone"));

	// membership info
	this.membershipType       = element(by.id(page + "-membership-type"));
	this.dateJoined           = element(by.id(page + "-date-joined"));
	this.lifePaymentDate      = element(by.id(page + "-life-payment-date"));
	this.registered           = element(by.id(page + "-status-online"));
	this.membershipDue        = element(by.id(page + "-due-date"));
	this.giftAidSigned        = element(by.id(page + "-gift-aid-signed"));
	this.giftAidSignedDate    = element(by.id(page + "-date-gift-aid-signed"));
	this.giftAidCancelledDate = element(by.id(page + "-date-gift-cancelled"));
	this.notes                = element(by.id(page + "-membership-notes"));
};

var PaymentMember = module.exports.PaymentMember = function () {

	this.dateS        = element(by.id("member-payment-date"));
	this.descriptionS = element(by.id("member-payment-description"));
	this.chargeS      = element(by.id("member-payment-charges"));
	this.paymentS     = element(by.id("member-balance-due"));
	this.balanceDueS  = element(by.id("member-payment-balance-due"));
	this.referenceS   = element(by.id("member-payment-reference"));
	this.noteS        = element(by.id("member-payment-notes"));
	this.deleteS      = element(by.id("member-payment-delete"));
};

var MemberPaymentsControls = module.exports.MemberPaymentsControls = function () {

	this.modeToEditBtn   = element(by.id("member-controls-mode-to-edit"));
	this.deleteBtn       = element(by.id("member-controls-delete-btn"));
	this.deletionReasons = element(by.id(""));

	// subscriptions
	this.subAmount       = element(by.id("member-controls-subscription-amount"));
	this.subBtn          = element(by.id("member-controls-subscription-pay-btn"));
	this.subRefundBtn    = element(by.id("member-controls-subscription-refund-btn"));

	// donation
	this.donationAmount  = element(by.id("member-controls-donation-amount"));
	this.donationNote    = element(by.id("member-controls-donation-note"));
	this.donationPay     = element(by.id("member-controls-donation-pay"));

	// payment
	this.paymentDate      = element(by.id("member-controls-payment-date"));
	this.paymentType      = element(by.id("member-controls-payment-type"));
	this.paymentReference = element(by.id("member-controls-payment-reference"));
	this.paymentAmount    = element(by.id("member-controls-payment-amount"));
	this.paymentNote      = element(by.id("member-controls-payment-note"));
};