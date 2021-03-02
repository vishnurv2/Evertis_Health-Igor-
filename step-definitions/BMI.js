const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see BMI output cell shows "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#bmi_output_cell_value').offset().top - ($(window).height() / 2));
    }, []);

    return client.getText('#bmi_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#bmi_output_cell_value').text.to.equal(res)
           }else{
            var monthChangeFlag = new Boolean(false)
            var tmp_curr_month
            var tmp_exp_month
            client.assert.equal(res_curr[0], res_exp[0])
            client.assert.equal(res_curr[1], res_exp[1])
            if(!(res_curr[2] === res_exp[2])){
                tmp_curr_month = parseInt(res_curr[2], 10)
                tmp_exp_month = parseInt(res_exp[2], 10)
                if(tmp_curr_month - tmp_exp_month == 1 || tmp_curr_month - tmp_exp_month == - 1){
                    monthChangeFlag = new Boolean(true)
                }
            }

            if(res_curr[2] == "00d" && res_exp[2] == "00d"){
                var tmp_curr = parseInt(res_curr[2], 10)
                var tmp_exp = parseInt(res_exp[2], 10)
            }else{
                var tmp_curr = parseInt(res_curr[3], 10)
                var tmp_exp = parseInt(res_exp[3], 10)
            }   


            console.log(tmp_exp+ " - expected days")
            console.log(tmp_curr+ " - actually days")

            if(tmp_curr == tmp_exp){
                client.assert.equal(tmp_exp, tmp_curr)
            } else if ((tmp_curr - tmp_exp) >= 5 || (tmp_curr - tmp_exp) <= -5){
                    console.log("Days summary = "+(tmp_curr + tmp_exp)+" Month statement - "+monthChangeFlag)
                    if  ((monthChangeFlag) && (tmp_curr + tmp_exp) < 35){
                        console.log("Current month - "+tmp_curr_month+" Expected - "+tmp_exp_month)
                        console.log("Current day - "+tmp_curr+" Expected - "+tmp_exp)
                    } else {
                        console.log(tmp_curr - tmp_exp)
                        client.assert.equal(tmp_exp, tmp_curr)
                    }

            // }else if(tmp_curr - 3 < tmp_exp || tmp_curr < tmp_exp - 3){
            //         client.assert.equal(tmp_exp, tmp_curr)
            }
             else{
                console.log("In range - "+res_exp)
                console.log("In range - "+res_curr)
                }
            }           
         })
    // return client.assert.containsText('#bmi_output_cell_value', res)
    // return client.expect.element('#bmi_output_cell_value').text.to.equal(res)
});

Then(/^I can see Height placeholder disabled$/, () => {
    return client.getAttribute('#height', "disabled")
});

Then(/^I enter the height "([^"]*)"$/, height => {
    return client.waitForElementPresent('#height_select', 3000).click("#height_select > [value='"+height+"']")
    // var select = "#height_select > [value='"+height+"']"
    // return client.click(select)   
});

Then(/^I can see Weight placeholder disabled$/, () => {
    return client.getAttribute('#weight', "disabled")
});

Then(/^I can see BMI placeholder disabled$/, () => {
    return client.getAttribute('#bmi', "disabled")
});
When(/^I enter the weight "([^"]*)"$/, weight => {
    client.waitForElementPresent('#weight', 3000)
    client.clearValue('#weight')
    return client.setValue('#weight', weight)
    // return client.moveToElement('#bmi_output_cell_value', 0, 0)
    // .mouseButtonClick('left')
    // .pause(5000)
    // .perform()
    
});
When(/^I can see BMI changed$/, () => {
 
    return client.expect.element('#weight').text.to.not.contain(" ").before(3000)
});

Then(/^I can see BMI "([^"]*)"$/, res => {
    client.moveToElement('#bmi_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
    return client.getValue('#bmi', obj => {
        var obj = JSON.parse(JSON.stringify(obj))
        value = new Object(obj.value).toString()
        client.assert.strictEqual(value, res)
    });
});

Then(/^I can see weight "([^"]*)"$/, res => {
    return client.getValue('#weight', obj => {
        var obj = JSON.parse(JSON.stringify(obj))
        client.assert.strictEqual(obj.value, res)
    });
});

Then(/^I can see BMI output changed$/, res => {

    return client.expect.element('#bmi_output_cell_value').text.to.contain("+ 03y 04m 29d").before(3000)
});

Then(/^I can change BMI "([^"]*)"$/, res => {
    client.clearValue('#bmi')
    client.setValue('#bmi', res)
    return client.moveToElement('#bmi_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
});

Then(/^I can see alert message "([^"]*)"$/, txt => {
    client.moveToElement('#bmi_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
    client.assert.containsText('#alert_dialog_text', txt)
    return client.click('#alert_dialog_button')
});

Then(/^I clear BMI parameters$/, () => {
    client.clearValue('#height')
    client.clearValue('#weight')
    return client.clearValue('#bmi')
});

Then(/^I check BMI summary "([^"]*)"$/, res => {
    return client.getText('#bmi_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#bmi_summary').text.to.equal(res)
           }else{
            var monthChangeFlag = new Boolean(false)
            var tmp_curr_month
            var tmp_exp_month
            client.assert.equal(res_curr[0], res_exp[0])
            client.assert.equal(res_curr[1], res_exp[1])
            if(!(res_curr[2] === res_exp[2])){
                tmp_curr_month = parseInt(res_curr[2], 10)
                tmp_exp_month = parseInt(res_exp[2], 10)
                if(tmp_curr_month - tmp_exp_month == 1 || tmp_curr_month - tmp_exp_month == - 1){
                    monthChangeFlag = new Boolean(true)
                }
            }

            if(res_curr[2] == "00d" && res_exp[2] == "00d"){
                var tmp_curr = parseInt(res_curr[2], 10)
                var tmp_exp = parseInt(res_exp[2], 10)
            }else{
                var tmp_curr = parseInt(res_curr[3], 10)
                var tmp_exp = parseInt(res_exp[3], 10)
            }   


            console.log(tmp_exp+ " - expected days")
            console.log(tmp_curr+ " - actually days")

            if(tmp_curr == tmp_exp){
                client.assert.equal(tmp_exp, tmp_curr)
            } else if ((tmp_curr - tmp_exp) >= 5 || (tmp_curr - tmp_exp) <= -5){
                    console.log("Days summary = "+(tmp_curr + tmp_exp)+" Month statement - "+monthChangeFlag)
                    if  ((monthChangeFlag) && (tmp_curr + tmp_exp) < 35){
                        console.log("Current month - "+tmp_curr_month+" Expected - "+tmp_exp_month)
                        console.log("Current day - "+tmp_curr+" Expected - "+tmp_exp)
                    } else {
                        console.log(tmp_curr - tmp_exp)
                        client.assert.equal(tmp_exp, tmp_curr)
                    }

            // }else if(tmp_curr - 3 < tmp_exp || tmp_curr < tmp_exp - 3){
            //         client.assert.equal(tmp_exp, tmp_curr)
            }
             else{
                console.log("In range - "+res_exp)
                console.log("In range - "+res_curr)
                }
            }         
         })
    // return client.assert.containsText('#bmi_summary', res)
    // return client.expect.element('#bmi_summary').text.to.equal(res)
});

Then(/^I check BMI summary value "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#bmi_summary_value').offset().top - ($(window).height() / 2));
    }, []);
    client.waitForElementPresent('#bmi_summary_value', 3000)
    client.pause(5000)
    return client.expect.element('#bmi_summary_value').text.to.equal(res)
});