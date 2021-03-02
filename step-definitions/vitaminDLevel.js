const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see Vitamin D Level placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#vitamin_d').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#vitamin_d', "disabled")
});

Then(/^I can see Vitamin D Level slider$/, () => {
    return client.waitForElementPresent('#vitamin_d_slider', 3000)
});

Then(/^I can see Vitamin D Level slider lower limit$/, () => {
    return client.waitForElementPresent('#vitamin_d_slider_lower_limit', 3000)
});

Then(/^I can see Vitamin D Level slider upper limit$/, () => {
    return client.waitForElementPresent('#vitamin_d_slider_upper_limit', 3000)
});

Then(/^I see Vitamin D Level output "([^"]*)"$/, res => {
    client.moveToElement('#vitamin_d_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(3000)
    .perform()

    return client.getText('#vitamin_d_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#vitamin_d_output_cell_value').text.to.equal(res)
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
         }).pause(5000)
    // return client.assert.containsText('#vitamin_d_output_cell_value', res)
    // return client.expect.element('#vitamin_d_output_cell_value').text.to.equal(res)
});

When(/^I enter Vitamin D Level "([^"]*)"$/, val => {

    client.execute(function () {
        $(window).scrollTop($('#vitamin_d_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#vitamin_d_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)

    client.clearValue('#vitamin_d')
    return client.setValue('#vitamin_d', val)
});

Then(/^I can see Vitamin D Level changed to "([^"]*)"$/, val => {
    client.moveToElement('#vitamin_d_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(3000)
    .perform()
    // console.log()
    return client.getValue('#vitamin_d', obj => {
        // var obj = JSON.parse(JSON.stringify(obj))
        value = new Object(obj.value).toString()
        // console.log("*******Smoking parameters - "+obj.value)
        client.assert.strictEqual(value, val)
    });
});

When(/^I change units to nmol\/L$/, () => {
    return client.click('select#vitamin_d_units_select > [value="si"]')
});

Then(/^I check Vitamin D summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#vitamin_d_summary_value', res)
    return client.expect.element('#vitamin_d_summary_value').text.to.equal(res)
});

Then(/^I check Vitamin D summary "([^"]*)"$/, res => {
    return client.getText('#vitamin_d_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#vitamin_d_summary').text.to.equal(res)
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
    // return client.assert.containsText('#vitamin_d_summary', res)
    // return client.expect.element('#vitamin_d_summary').text.to.equal(res)
});