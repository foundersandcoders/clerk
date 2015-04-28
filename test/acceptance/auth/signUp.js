"use strict";

module.exports = function (params, browser, test){

	test("Sign up", function (t){

		var signUp = new params.signUp.page(browser);

		t.test("should NOT be able to sign up with partial details", function (st){
			
			browser.url(params.service.clerk+"/signup");
			browser.setValue(signUp.email, "partial@gmail.com");
			browser.setValue(signUp.password, "password");
			browser.click(signUp.signUpButton);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk + "/signup", "still in signup url");
				st.end();
			});
		});

		t.test("should be ABLE to sign up with CORRECT credentials", function (st){
			
			browser.url(params.service.clerk+"/signup");
			browser.setValue(signUp.email, params.signUp.email);
			browser.setValue(signUp.password, params.signUp.password);
			browser.setValue(signUp.cpassword, params.signUp.password);
			browser.click(signUp.signUpButton);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk + "/", "admin url");
				st.end();
			});
		});
	});
};