const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');


Then(/^I see Date Of Birth "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.birthday-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.birthday-section', 3000);
    }
  });

  Then(/^I see Gender "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.gender-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.gender-section', 3000);
    }
  });

  Then(/^I see Underlying Conditions "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.underlying-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.underlying-section', 3000);
    }
  });

  Then(/^I see BMI "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.bmi-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.bmi-section', 3000);
    }
  });

  Then(/^I see Waist "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.waist-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.waist-section', 3000);
    }
  });

  Then(/^I see Smoking "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.smoking-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.smoking-section', 3000);
    }
  });

  Then(/^I see Blood Pressure "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.blood-pressure-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.blood-pressure-section', 3000);
    }
  });

  Then(/^I see Vitamin D Level "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.vitamin-d-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.vitamin-d-section', 3000);
    }
  });

  Then(/^I see AngioDefender or FMD "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.fmd-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.fmd-section', 3000);
    }
  });

  Then(/^I see HbA1c "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.diabetes-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.diabetes-section', 3000);
    }
  });

Then(/^I see Cholesterol "([^"]*)"$/, tabExist => {
    if(tabExist == "exist"){
        return client.waitForElementPresent('.lipids-section', 3000);
    }
    else{
        return client.waitForElementNotVisible('.lipids-section', 3000);
    }
});