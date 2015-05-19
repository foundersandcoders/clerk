var stop       = function(){return browser.pause()};

var CreateMember = browser.params.helpers.pages.view.CreateMember;
var ViewMember   = browser.params.helpers.pages.view.ViewMember;
var params       = browser.params;


describe("Create member: ", function(){
	var memberAdd  = new CreateMember();
	var memberView = new ViewMember();

	// TODO: create a member with all the attributes
	it("should be able to fill all inputs and create a member.", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/addmember");

		memberAdd.id.sendKeys("67821");
		memberAdd.firstName.sendKeys("Bes");
		memberAdd.initials.sendKeys("B J S");
		memberAdd.lastName.sendKeys("Hoxhaj");
		memberAdd.title.sendKeys("Mr.");
		memberAdd.email1.sendKeys("besartshyti@gmail.com");
		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + "67821");
	});
	// TODO: check a member with all the attributes
	it("should see the correct values", function () {
		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + "67821");

		expect(memberView.id.getText()).toBe("67821");
		expect(memberView.fullName.getText()).toBe("Mr. Bes B J S Hoxhaj");
	});
});