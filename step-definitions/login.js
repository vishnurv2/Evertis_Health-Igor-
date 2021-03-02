const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

When(/^I click on Symptoms tracker button$/, () => {
    return client.click('#symptoms_tracker_link');
});

When(/^I click on DietID$/, () => {
    return client.click('#dietid_link');
});    

When(/^I click on Tell Friends$/, () => {
    return client.click('#share_button');
});  

When(/^I click on Save Result$/, () => {
    return client.click('#save_button');
});  

Then(/^I assert requred data window$/, () => {
    client.waitForElementPresent('#dobRequiredModal', 3000)
    // client.expect.element("#dobRequiredModal > h3[xpath='1']").text.to.equal("Date of Birth and Gender are required to create an account or save results.")
    client.pause(500)
    return client.click('#close_dob_button');
});  

When(/^I click on Login button$/, () => {
    client.pause(3000)
    client.moveToElement('#login_button_top', 0, 0)
    .pause(1000)
    .perform()
    return client.click('#login_button_top')


}); 

Then(/^I assert login window open$/, () => {
    return client.waitForElementPresent('#loginModal', 3000)
}); 

When(/^I enter user name "([^"]*)"$/, userName => {
    client.moveToElement('#username', 0, 0)
    .mouseButtonClick('left')
    .pause(1000)
    .perform()
    client.clearValue('#username')
    return client.setValue('#username', userName)
});

When(/^I enter password "([^"]*)"$/, passwd => {
    client.moveToElement('#password', 0, 0)
    .mouseButtonClick('left')
    .pause(1000)
    .perform()
    client.clearValue('#password')
    return client.setValue('#password', passwd)
});

Then(/^I assert no credentials message "([^"]*)"$/, message => {
    client.pause(3000)
    return client.expect.element("form[action='https://calculator.qa.everisthealth.net/login'] .invalid-feedback").text.to.equal(message)

});

When(/^I click on Create Account$/, () => {

    // client.moveToElement('#register_button', 0, 0)
    // .mouseButtonClick('left')
    // .pause(1000)
    // .perform()
    return client.click('#register_button');
}); 


When(/^I click on Log In$/, () => {
    
    client.useXpath();
    client.waitForElementPresent("//button[contains(.,'Log In')]", 3000)
    client.click("//button[contains(.,'Log In')]");
    return client.useCss();
});


Then(/^I click on Log In Profile$/, () => {
    return client.click("form[action='https://profile.qa.everisthealth.net/login'] .btn-primary");
});
Then(/^I click on Log In Sanford$/, () => {
    return client.useXpath.click("//button[contains(.,'Log In')]").useCss;
});
Then(/^I click on Log In SD$/, () => {
    client.useXpath();
    client.click("//button[contains(.,'Log In')]");
    return client.useCss();
});
When(/^I click on close$/, () => {
    return client.click("div#dobRequiredModal .close");
});

Then(/^I assert email text box$/, () => {
    return client.expect.element('#emailInput').to.be.present;
});
Then(/^I assert password text box$/, () => {
    return client.expect.element('#passwordInput').to.be.present;
});
Then(/^I assert confirm password text box$/, () => {
    return client.expect.element('#password-confirm').to.be.present;
});
Then(/^I assert check box with aggrement$/, () => {
    return client.expect.element("[for='termsagree']").to.be.present;
});

Then(/^I assert checkbox to receive emails$/, () => {
    return client.expect.element("[for='optin']").to.be.present;
});

Then(/^I assert create account button$/, () => {
    return client.expect.element('form#registerForm .btn').to.be.present;
});

Then(/^I assert login button$/, () => {
    return client.expect.element('#login_button').to.be.present;
});

Then(/^I close create account window$/, () => {
    return client.click('div#registerModal .close');
});
Then(/^I assert logged in user postal code "([^"]*)"$/, postalCode => {
    client.pause(1500)
    return client.expect.element('#topZip').text.to.equal(postalCode)
});

When(/^I click Logout$/, () => {
    return client.click('#logout_button_top');

});

Then(/^I assert data saved$/, () => {

    client.waitForElementPresent('div#savedModal .modal-content', 3000)
    client.assert.containsText('.pb-3', "Your Results have been saved.")
    client.expect.element("div#savedModal .modal-content  a[href='https://twitter.com/intent/tweet?url=https://calculator.qa.everisthealth.net']").to.be.present;
    client.expect.element("div#savedModal .modal-content  a[href='https://www.facebook.com/sharer/sharer.php?u=https://calculator.qa.everisthealth.net']").to.be.present;
    return client.click("div#savedModal .modal-content  button[xpath='1']")
});
