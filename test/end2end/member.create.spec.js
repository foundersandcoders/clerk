var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Create member: ", function(){
	var memberAdd  = new CreateMember();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	// TODO: create a member with all the attributes
	it("should be able to fill all inputs and create a member.", function (){

		browser.ignoreSynchronization = true;

		browser.driver.get(params.service.clerk + "/addmember");
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/addmember");

		// profile
		memberAdd.id.sendKeys(memberMock.id);
		memberAdd.firstName.sendKeys(memberMock.firstName);
		memberAdd.initials.sendKeys(memberMock.initials);
		memberAdd.lastName.sendKeys(memberMock.lastName);
		memberAdd.title.sendKeys(memberMock.title);

		// address
		memberAdd.address1.sendKeys(memberMock.address1);
		memberAdd.address2.sendKeys(memberMock.address2);
		memberAdd.county.sendKeys(memberMock.county);
		memberAdd.postcode.sendKeys(memberMock.postcode);
		// // memberAdd.deliverer.sendKeys(memberMock.deliverer);

		// contact
		memberAdd.homePhone.sendKeys(memberMock.homePhone);
		memberAdd.workPhone.sendKeys(memberMock.workPhone);
		memberAdd.mobilePhone.sendKeys(memberMock.mobilePhone);
		memberAdd.primaryEmail.sendKeys(memberMock.primaryEmail);
		memberAdd.secondaryEmail.sendKeys(memberMock.secondaryEmail);


		// membership
		element(by.cssContainingText("option", memberMock.membershipType)).click();
		memberAdd.dateJoined.sendKeys(memberMock.dateJoined);
		memberAdd.giftAidSigned.click();
		memberAdd.giftAidSignedDate.sendKeys(memberMock.giftAidSignedDate);
		element(by.cssContainingText("option", memberMock.newsType)).click();
		memberAdd.notes.sendKeys(memberMock.notes);

		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);
	});
	// TODO: check a member with all the attributes
	it("should see the correct values", function () {
		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

		stop();

		// profile
		expect(memberView.fullName.getText()).toBe(memberMock.fullName);
		expect(memberView.id.getText()).toBe(memberMock.id);
		expect(memberView.primaryEmail.getText()).toBe(memberMock.primaryEmail);
		expect(memberView.secondaryEmail.getText()).toBe(memberMock.secondaryEmail);
		expect(memberView.status.getText()).toBe(memberMock.status);
		expect(memberView.newsType.getText()).toBe(memberMock.newsType);

		// address
		expect(memberView.address1)


		expect(memberView.dateJoined.getText()).toBe(memberMock.dateJoined);
		// expect(memberView.registered.getText()).toBe(memberMock.registered);
	});
});