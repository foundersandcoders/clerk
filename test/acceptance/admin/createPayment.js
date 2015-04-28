"use strict";

module.exports = function (params, browser, test){

	var payment       = new params.admin.addPayment();

	test("Create payment:", function (t){

		t.test("- by clicking on add payment in show member", function (st){

			browser.click(payment.addPaymentBtn);
			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk+"/members/8264/payments", "right url");
				st.end();
			});
		});

		t.test("- fill up the payment form and submit", function (st){

			browser.execute(function (){
				document.getElementById("payment-date").value = "2011-11-11";
			},null);

			browser.selectByValue(payment.types, "CASH");
			browser.setValue(payment.subscription, "10");
			browser.setValue(payment.donation, "10");
			browser.setValue(payment.events, "10");
			browser.click(payment.submit);

			browser.url(function (err, res){

				st.equals(res.value, params.service.clerk+"/members/8264");
				st.end();
			});
		});
	});
};