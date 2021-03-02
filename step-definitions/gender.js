const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

// When(/^I can see Male$/, () => {
//     return client.waitForElementPresent('[for="gender_male"]', 3000)
// });

// When(/^I can see Female$/, () => {
//     return client.waitForElementPresent('[for="gender_female"]', 3000)
// });

When(/^I can select Male$/, () => {
    client.pause(500)
    var select = "#gender_select > [value='0']"
    return client.click(select)   
});

// When(/^I assert "([^"]*)" appear on gender output cell$/, gen => {
//     client.pause(500)
//     // return client.assert.containsText('#gender_output_cell_value', gen)
//     return client.expect.element('#gender_output_cell_value').text.to.equal(gen)
// });

When(/^I can select Female$/, () => {
    client.pause(500)
    var select = "#gender_select > [value='1']"
    return client.click(select)   
});

// When(/^I can click on Gender question mark and assert info$/, () => {
//     return client.click('a[data-original-title="Gender"]').text.to.contain("Although men appear to be at a higher risk for severe complications from COVID-19 infection than women, the reasons for this gender difference remain unclear.")
// });

Then(/^I check gender summary value "([^"]*)"$/, gen => {
    // return client.assert.containsText('#gender_summary', gen)
    return client.expect.element('#gender_summary').text.to.equal(gen)
});

// Then(/^I can see gender placeholder "([^"]*)"$/, gen => {
//     // return client.assert.containsText('#gender_output_cell_value', gen)
//     return client.expect.element('#gender_output_cell_value').text.to.equal(gen)
// });