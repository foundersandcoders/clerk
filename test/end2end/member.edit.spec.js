var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var EditMember   = browser.params.helpers.pages.EditMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Edit member: ", function(){
	var memberEdit = new EditMember();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	it("by default should be in 'VIEW MODE'", function (){

		browser.ignoreSynchronization = true;

		expect(memberEdit.mode.isPresent()).toBe(true);
		expect(memberEdit.modeSave.isPresent()).toBe(false);
		expect(memberEdit.modeCancel.isPresent()).toBe(false);
		expect(memberEdit.mode.getText()).toBe("Edit");
	});

	it("should be able to switch to 'EDIT MODE'", function (){

		browser.ignoreSynchronization = true;

		memberEdit.mode.click();

		browser.sleep(1500);
	});

	it("should see 'EDIT MODE' buttons", function (){

		browser.ignoreSynchronization = true;

		expect(memberEdit.modeSave.isPresent()).toBe(true);
		expect(memberEdit.modeCancel.isPresent()).toBe(true);
		expect(memberEdit.modeSave.getText()).toBe("Save");
		expect(memberEdit.modeCancel.getText()).toBe("Cancel");
	});

	it("should see the 'PROFILE' inputs pre-filled", function () {

		browser.ignoreSynchronization = true;

		expect(memberEdit.id.getText()).toBe(memberMock.id);
		expect(memberEdit.title.getText()).toBe(memberMock.title);
		expect(memberEdit.initials.getText()).toBe(memberMock.initials);
		expect(memberEdit.firstName.getText()).toBe(memberMock.firstName);
		expect(memberEdit.lastName.getText()).toBe(memberMock.lastName);
		expect(memberEdit.primaryEmail.getText()).toBe(memberMock.primaryEmail);
		expect(memberEdit.secondaryEmail.getText()).toBe(memberMock.secondaryEmail);
	});

	it("should see the 'ADDRESS' inputs pre-filled", function () {



	});

	it("should see the 'MEMBERSHIP' inputs pre-filled", function () {



	});
});









