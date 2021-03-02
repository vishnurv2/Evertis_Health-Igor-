const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open COVIDAge Risk Calculator home page "([^"]*)"$/, url => {
    return client.url(url).maximizeWindow();
});

// Given(/^I am on the video page$/, () => {
//   return client.waitForElementPresent('div#introModal .modal-header > .w-100', 5000);
// });

Given(/^I am on the video page$/, () => {
  client.pause(2000)
  return client.waitForElementPresent('#introModal', 5000);
});

When(/^I click get started$/, () => {
  client.pause(500)
  return client.click('#skipIntroButton')
});

Then(/^I am on the welcome page$/, () => {
    return client.waitForElementPresent('#disclaimerCountry', 5000);
});

// When(/^I select country "([^"]*)"$/, country => {
//     return client.click('#disclaimerCountry option[value='+country+']');

// });

When(/^I select country "([^"]*)"$/, country => {
 
  client.useXpath();
  client.click("//option[.='"+country+"']");
  return client.useCss()
});

When(/^I type proper postal code "([^"]*)"$/, postalCode => {
    
    client.pause(1000)
    return client.setValue('#disclaimerZip', postalCode).pause(500)
});

Then(/^I assert postal code contains "([^"]*)"$/, postalCode => {
  return client.expect.element('#disclaimerZip').text.to.contain(postalCode).before(3000);
});

Then(/^I assert green checkmark$/, () => {
    return client.expect.element('.fa-check-circle').to.be.present;
});

Then(/^I assert city name "([^"]*)"$/, city => {
  client.pause(1000)
    client.waitForElementPresent('div.col-md-4 > .success', 5000);
    return client.expect.element('div.col-md-4 > .success').text.to.contain(city).before(3000);
});

Then(/^I assert SD city name "([^"]*)"$/, city => {
  client.waitForElementPresent('div#zipModal .col-12 > .success', 5000);
  return client.expect.element('div#zipModal .col-12 > .success').text.to.contain(city).before(3000);
});

When(/^I click on button ACCEPT$/, () => {
    client.waitForElementPresent('div#disclaimerModal #acceptButton', 3000)
    return client.click('div#disclaimerModal #acceptButton');
    
});

Then(/^I assert COVIDAge Risk Calculator home page$/, () => {
    return client.waitForElementPresent('css selector', '.site-logo', 6000);
});

Then(/^I close webpage$/, () => {
  return client.end();
});

Then(/^I assert red checkmark$/, () => {
  return client.expect.element('.fa-exclamation-circle').to.be.present;
});

Then(/^I assert error message "([^"]*)"$/, text => {
  return client.assert.containsText("div.col-md-4 > .error", "Please enter a valid postal code for the selected country.")
});

When(/^I click on postal code$/, () => {
  return client.click('#topZip');
});
Then(/^I enter postal code "([^"]*)"$/, po => {
client.pause(1000)
client.clearValue('#zip')
return client.setValue('#zip', po).pause(1000);
});
When(/^I click save result$/, () => {
  return client.click('div#zipModal #acceptButton').pause(500);
});
When(/^I click on button ACCEPT PO$/, () => {
return client.click('div#retentionModal #acceptButton').pause(500);
});