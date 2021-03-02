const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see A1c placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#a1c').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#a1c', "disabled")
});

Then(/^I can see A1c slider$/, () => {
    return client.waitForElementPresent("input[aria-label='A1c']", 3000)
});

Then(/^I can see A1c slider lower limit$/, () => {
    return client.waitForElementPresent('fieldset.diabetes-section .is-min', 3000)
});

Then(/^I can see A1c slider upper limit$/, () => {
    return client.waitForElementPresent('fieldset.diabetes-section .is-max', 3000)
});

Then(/^I see A1c output "([^"]*)"$/, res => {
    client.moveToElement('fieldset.diabetes-section .section-numbers', 0, 0)
    .mouseButtonClick('left')
    .pause(3000)
    .perform()

    return client.getText('fieldset.diabetes-section .section-numbers', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('fieldset.diabetes-section .section-numbers').text.to.equal(res)
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
    // return client.assert.containsText('fieldset.diabetes-section .section-numbers', val)
    // return client.expect.element('fieldset.diabetes-section .section-numbers').text.to.equal(val)
});

When(/^I enter A1c "([^"]*)"$/, val => {

    client.execute(function () {
        $(window).scrollTop($('.a1c_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('.a1c_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)
   
    client.clearValue('#a1c')
    return client.setValue('#a1c', val)
});

Then(/^I can see A1c changed to "([^"]*)"$/, val => {
    client.moveToElement('#diabetes_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(3000)
    .perform()
    // console.log()
    return client.getValue('#a1c', obj => {
        var obj = JSON.parse(JSON.stringify(obj))
        // // value = new Object(obj.value).toString()
        // console.log("*******Smoking parameters - "+obj.value)
        client.assert.strictEqual(obj.value, val)
    });
});

Then(/^I check A1c summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#a1c_summary_value', res)
    return client.expect.element('#a1c_summary_value').text.to.equal(res)
});

Then(/^I check A1c summary "([^"]*)"$/, res => {
    return client.getText('#a1c_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
            client.pause(10000)
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#a1c_summary').text.to.equal(res)
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
    // return client.assert.containsText('#a1c_summary', res)
    // return client.expect.element('#a1c_summary').text.to.equal(res)
});