"use strict";

module.exports = function (params, browser, test){

	test("Sign in", function (t){

		var signIn = new params.signIn.page(browser);

		t.test("should NOT be able to login with WRONG credentials", function (st){

			browser.deleteCookie();

			browser.url(params.service.clerk+"/login");

			browser.setValue(signIn.email, "nonexisting");
			browser.setValue(signIn.password, "wrong");
			browser.click(signIn.signInButton);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk + "/login", "login url");
				st.end();
			});
		});

		t.test("should be ABLE to login with CORRECT credentials", function (st){
			
			browser.url(params.service.clerk+"/login");

			browser.setValue(signIn.email, params.signUp.email);
			browser.setValue(signIn.password, params.signUp.password);
			browser.click(signIn.signInButton);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk + "/", "admin url");
				st.end();
			});
		});
	});
};