"use strict";

module.exports = function (params, browser, test){

	var nav           = new params.layout.navbar();
	var manageMember  = new params.admin.manageMember();
	var addMember     = new params.admin.addMember();
	var showMember    = new params.admin.showMember();

	test("Create member:", function (t){

		t.test("- go to admin screen and click add member", function (st){

			browser.click(nav.adminLink);
			browser.click(manageMember.addBtn);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk+"/addmember", "add member page");
				st.end();
			});
		});

		t.test("- fill some inputs and submit", function (st){

			browser.setValue(addMember.id, "8264");
			browser.setValue(addMember.firstName, "Besart");
			browser.setValue(addMember.lastName, "Hoxhaj");
			browser.setValue(addMember.title, "Mr.");
			browser.click(addMember.submitBtn);

			browser.url(function (err, res){
				st.equals(res.value, params.service.clerk+"/members/8264", "show member page");
				st.end();
			});	
		});

		t.test("- see information of the new created member", function (st){

			browser.getText(showMember.firstName, function (err, text){
				st.equals(text, "Besart", "right first name");
				st.end();
			});
		});
	});
};