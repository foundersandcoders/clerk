var stop        = function(){return browser.pause()};
var SignUpPages = browser.params.helpers.pages.view.SignUp;
var SignInPages = browser.params.helpers.pages.view.SignIn;
var params      = browser.params;

describe('As admin I can login and see admin home screen', function(){
	var signUp    = new SignUpPages();
	var signIn    = new SignInPages();

	beforeEach(function (){
		browser.manage().deleteAllCookies();
	});
	it("should be closed to non-admin", function () {
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/admin");
		
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/login');
	});
	it('from "signUp"', function(){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/signup");

		signUp.email.sendKeys("besart");
		signUp.password.sendKeys("hello");
		signUp.cpassword.sendKeys("hello");
		signUp.submit.click();
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/admin');
	});

	it("should be able to signIn after signup", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/login");

		signIn.email.sendKeys("besart");
		signIn.password.sendKeys("hello");
		signIn.submit.click();
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/admin');
	});
});