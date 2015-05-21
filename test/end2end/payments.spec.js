var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var params       = browser.params;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var ViewPayments = params.helpers.pages.PaymentMember;
var MemberPaymentsControls = browser.params.helpers.pages.MemberPaymentsControls;

describe("Create payment: ", function(){
	var memberAdd   = new CreateMember();
	var memberMock  = Mocks.member();
	var paymentControls  = new MemberPaymentsControls();
  var paymentMock = Mocks.payment({});
  var viewPayment = new ViewPayments();

	// create member
  it("should be able to fill all inputs and create a member.", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/addmember");

		memberAdd.id.sendKeys(memberMock.id);
		memberAdd.firstName.sendKeys(memberMock.firstName);
		memberAdd.initials.sendKeys(memberMock.initials);
		memberAdd.lastName.sendKeys(memberMock.lastName);
		memberAdd.title.sendKeys(memberMock.title);
		memberAdd.email1.sendKeys(memberMock.email1);
		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);
	});

  // create payments
  it("should see the correct values", function () {
		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    paymentControls.paymentDate.sendKeys(paymentMock.date);
    paymentControls.paymentType.sendKeys(paymentMock.type);
    /*paymentControls.paymentReference.sendKeys(paymentMock.listReference);
    paymentControls.paymentAmount.sendKeys(paymentMock.total);
    paymentControls.paymentNote.sendKeys(paymentMock.notes);*/
    paymentControls.paymentSubmit.click();

    //expect(viewPayment.dateS.getText()).toBe(paymentMock.date);
      expect(viewPayment.paymentS.getText()).toBe(paymentMock.total);
      /*expect(viewPayment.balanceDueS.getText()).toBe(String(0-Number(paymentMock.total)));
      expect(viewPayment.referenceS.getText()).toBe(paymentMock.listReference);
      expect(viewPayment.noteS.getText()).toBe(paymentMock.notes);*/


  });
});
