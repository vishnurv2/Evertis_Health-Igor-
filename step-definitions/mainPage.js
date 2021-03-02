const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');


Then(/^I assert tab row exist$/, () => {
    return client.assert.elementPresent('#topTabs', "Tab Row exist");
});
Then(/^I see Calculator tab$/, () => {
    return client.assert.elementPresent('#calculatorTab', "Top Tabs row exist");
});
Then(/^I see Summary tab$/, () => {
    return client.assert.elementPresent('#summaryTab', "Top Tabs row exist");
});

Then(/^I assert result tab row exist$/, () => {
    return client.assert.elementPresent('#topTabs', "Top Tabs row exist");
});
Then(/^I see Risk Tab$/, () => {
    return client.assert.elementPresent('#riskTab', "Risk Tab exist");
});
Then(/^I see Age Tab$/, () => {
    return client.assert.elementPresent('#ageTab', "Age Tab exist");
});
Then(/^I see question mark$/, () => {
    return client.assert.elementPresent('li.text-right .fas', "Question mark exist");
});
Then(/^I see Content tab$/, () => {
    return client.assert.elementPresent('div.results-tab .tab-content', "Content tab exist");
});
Then(/^I see Hospitality value equal "([^"]*)"$/, value => {
    client.waitForElementPresent('#hospital_value', 3000);
    // return client.assert.containsText("#hospital_value", value);
    client.pause(1000)
    return client.expect.element('#hospital_value').text.to.equal(value)
});
Then(/^I see ICU Admision value equal "([^"]*)"$/, value => {
    client.waitForElementPresent('#icu_value', 3000);
    // return client.assert.containsText("#icu_value", value);
    return client.expect.element('#icu_value').text.to.equal(value)
});
Then(/^I see Mortality value equal "([^"]*)"$/, value => {
    client.waitForElementPresent('#death_value', 3000);
    // return client.assert.containsText("#death_value", value);
    return client.expect.element('#death_value').text.to.equal(value)
});
Then(/^I see Calculated age years "([^"]*)"$/, valuey => {
    client.waitForElementPresent('#year_label', 3000);
    // return client.assert.containsText("#year_label", valuey);
    return client.expect.element('#year_label').text.to.equal(valuey)
});
Then(/^I see Calculated age month "([^"]*)"$/, valuem => {
    client.waitForElementPresent('#month_label', 3000);
    // return client.assert.containsText("#month_label", valuem);
    return client.expect.element('#month_label').text.to.equal(valuem)
});
Then(/^I see Calculated age days "([^"]*)"$/, res => {
    client.waitForElementPresent('#day_label', 3000);
    // return client.assert.containsText("#day_label", valued);
    return client.getText('#day_label', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res
           var res_curr = result.value
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#day_label').text.to.equal(res)
           }else{
                // client.assert.equal(res_curr, res_exp)
                if(res_curr == "00d" && res_exp == "00d"){
                    var tmp_curr = parseInt(res_curr, 10)
                    var tmp_exp = parseInt(res_exp, 10)
                }else{
                    var tmp_curr = parseInt(res_curr, 10)
                    var tmp_exp = parseInt(res_exp, 10)
                }   
                console.log(tmp_exp+ " - expected")
                console.log(tmp_curr+ " - actually")
                if(tmp_curr == tmp_exp){
                    client.assert.equal(tmp_exp, tmp_curr)
                } else if ((tmp_curr - tmp_exp) >= 4 || (tmp_curr - tmp_exp) <= -4){
                        console.log(tmp_curr - tmp_exp)
                        client.assert.equal(tmp_exp, tmp_curr)
                // }else if(tmp_curr - 3 < tmp_exp || tmp_curr < tmp_exp - 3){
                //         client.assert.equal(tmp_exp, tmp_curr)
                }
                 else{
                    console.log("In range - "+res_exp)
                    console.log("In range - "+res_curr)
                    }
                }      
         })
});

Then(/^I assert footer tab row exist$/, () => {
    return client.waitForElementPresent('.site-footer', 3000);
});
Then(/^I see Share chart button$/, () => {
    return client.waitForElementPresent('#share_chart', 3000);
});
Then(/^I see Print button$/, () => {
    return client.waitForElementPresent('#print_button', 3000);
});
Then(/^I see Clear all button$/, () => {
    return client.waitForElementPresent('#clear_button', 3000);
});
// Then(/^I see Symptoms tracker image$/, () => {
//     client.execute(function () {
//         $(window).scrollTop($("[src='/images/symptoms_tracker.png']").offset().top - ($(window).height() / 2));
//     }, []);
//     return client.waitForElementPresent("[src='/images/symptoms_tracker.png']", 3000);
// });
Then(/^I see Symptoms tracker button$/, () => {
    return client.waitForElementPresent('#symptoms_tracker_link', 3000);
});

Then(/^I see DietID button$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#dietid_link').offset().top - ($(window).height() / 2));
    }, []);
    return client.waitForElementPresent('#dietid_link', 3000);
});
When(/^I click on DietID button$/, () => {
    return client.click('#dietid_link');
});
Then(/^I see DietID image$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#save_button').offset().top - ($(window).height() / 2));
    }, []);
    return client.waitForElementPresent('#save_button', 3000);
});
Then(/^I see Save Result button$/, () => {
    return client.waitForElementPresent('#save_button', 3000);
});

Then(/^I save results$/, () => {
    client.click('#save_button');
    client.pause(500)
    client.useXpath()
    client.waitForElementPresent("//div[@id='savedModal']//button[@class='close']", 3000)
    client.click("//div[@id='savedModal']//button[@class='close']").pause(500)
    return client.useCss()
});

Then(/^I click on Save Result button$/, () => {
    return client.click('#save_button');
});
When(/^I clear all entered data$/, () => {
    client.waitForElementPresent('#clear_button', 3000);
    client.click('#clear_button')
    return client.execute(function () {
        $(window).scrollTop($('.site-logo').offset().top - ($(window).height() / 2));
    }, []);
});

Then(/^I can see Units placeholder$/, () => {
    return client.getLocationInView('#global_units_select')
   .assert.visible('#global_units_select')
});

When(/^I chanhge units to Metric$/, () => {
    return client.waitForElementPresent('#global_units_select').click("option[value='metric']")
});

When(/^I chanhge units to Imperial$/, () => {
    return client.waitForElementPresent('#global_units_select').click("option[value='imperial']")
});

When(/^I click on summary$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#summaryTab').offset().top - ($(window).height() / 2));
    }, []);
    client.click('#summaryTab')
    return client.pause(500)
});

When(/^I click on calculator$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#calculatorTab').offset().top - ($(window).height() / 2));
    }, []);
    client.click('#calculatorTab')
    return client.pause(500)
});

Then(/^I assert Login window popup$/, () => {
    client.pause(500)
    return client.waitForElementPresent('div#loginModal .modal-body', 3000)
});

Then(/^I close Login window popup$/, () => {
    return client.click('div#loginModal .close')
});

Then(/^I assert Sanford page "([^"]*)"$/, url => {
    return client.assert.urlEquals(url)
});

Then(/^I assert logo south dacota$/, () => {
    client.useXpath()
    client.waitForElementPresent("//a[@href='https://covid.sd.gov/']", 3000)
    return client.useCss()
});

Then(/^I assert logo profile$/, () => {
    client.useXpath()
    client.waitForElementPresent("//a[@href='https://locations.profileplan.com']", 3000)
    return client.useCss()
});

Then(/^I activate fields$/, () => {
    return client.waitForElementPresent('#showFields', 3000).click("#showFields").pause(500)
});

Then(/^I close all$/, () => {
    return client.end()
});
