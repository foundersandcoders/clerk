"use strict";

module.exports = {
	SignInPage: SignInPage,
	SignUpPage: SignUpPage
};

function SignInPage () {

	this.email        = "#email";
	this.password     = "#password";
	this.signInButton = "#button_sign_in";
}

function SignUpPage () {

	this.email        = "#email";
	this.password     = "#password";
	this.cpassword    = "#cpassword";
	this.signUpButton = "#button_sign_up";
}