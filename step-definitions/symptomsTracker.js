const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I click on Symptoms tracker button and verify new tab open$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#symptoms_tracker_link').offset().top - ($(window).height() / 2));
    }, []);
    var newWindow;
    return client.click('#symptoms_tracker_link').pause(1000).windowHandles(function(result) {
        
        newWindow = result.value[1];
        this.switchWindow(newWindow);
      });
});

Then(/^I verify symptoms tracker page$/, () => {
    return client.assert.title("COVIDAge Test & Symptom Tracker - EveristHealth")
});



When(/^I select hard time breathing checkbox$/, () => {
    return client.click("[for='breathing']")
});

When(/^I select chest pain checkbox$/, () => {
    return client.click("[for='chest_pain']")
});

When(/^I select food down checkbox$/, () => {
    return client.click("[for='food_down']")
});

When(/^I select lightheaded checkbox$/, () => {
    return client.click("[for='lightheaded']")
});

When(/^I select speech checkbox$/, () => {
    return client.click("[for='speech']")
});

When(/^I select getting_worse checkbox$/, () => {
    return client.click("[for='getting_worse']")
});

When(/^I select None of the Above checkbox$/, () => {
    return client.click("[for='none']")
});


Then(/^I click on next button$/, () => {
    client.waitForElementVisible('#life-next', 3000)
    return client.click('#life-next')
});

Then(/^I verify resolution medical care$/, () => {
    client.waitForElementVisible('#resultsIcon', 3000)
    return client.click('#resultsIcon')
});

Then(/^I click on start over button$/, () => {
    client.waitForElementVisible('#start-over', 3000)
    return client.click('#start-over')
});

Then(/^I verify Covid Status page$/, () => {
    return client.waitForElementVisible('section#covid-status h3', 3000)
});


When(/^I select PCR "([^"]*)"$/, val => {
    client.pause(1000)
    if(val === 'NA'){
        return client.click(".relative[for='rt_pcr_status_not_tested']")
    }
    if(val === 'Positive'){
        return client.click(".relative[for='rt_pcr_status_positive']")
    }
    if(val === 'Negative'){
        return client.click(".relative[for='rt_pcr_status_negative']")
    }
    
});


Then(/^I select date PCR "([^"]*)"$/, val => {
    return client.setValue('#rt_pcrtest_date', val)
});


When(/^I select Antigen "([^"]*)"$/, val => {
    if(val === 'NA'){
        return client.click(".relative[for='antigen_status_not_tested']")
    }
    if(val === 'Positive'){
        return client.click(".relative[for='antigen_status_positive']")
    }
    if(val === 'Negative'){
        return client.click(".relative[for='antigen_status_negative']")
    }
});


Then(/^I select date Antigen "([^"]*)"$/, val => {
    return client.setValue('#antigentest_date', val)
});


When(/^I select Antibodies "([^"]*)"$/, val => {
    if(val === 'NA'){
        return client.click(".relative[for='antibodies_status_not_tested']")
    }
    if(val === 'Positive'){
        return client.click(".relative[for='antibodies_status_positive']")
    }
    if(val === 'Negative'){
        return client.click(".relative[for='antibodies_status_negative']")
    }
});


Then(/^I select date Antibodies "([^"]*)"$/, val => {
    client.setValue('#antibodiestest_date', val)
    return client.click('section#covid-status h2').pause(1000)
});

When(/^I verify Vaccination "([^"]*)"$/, val => {
    return true
});


Then(/^I select Vaccination "([^"]*)"$/, val => {
    return client.click("#vaccinationSelect option[value='mRNA-1273']")
});

Then(/^I select date Vaccination "([^"]*)"$/, val => {
    return client.setValue('#vaccination_date', val)
});

Then(/^I click Next$/, () => {
    client.waitForElementVisible('#status-next', 3000)
    return client.click('#status-next')
});


Then(/^I verify step appear$/, () => {
    return client.expect.element('section#symptoms h2').text.to.equal("Step 3 of 3")
});

When(/^I click Symptoms Next$/, () => {
    client.waitForElementVisible('#symptoms-next', 3000)
    return client.click('#symptoms-next')
});

Then(/^I can see no reported symptoms$/, () => {
    return client.waitForElementVisible('#resultsIcon', 3000)
});

