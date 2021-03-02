const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see Circ. placeholder disabled$/, () => {
    return client.getAttribute('#waist', "disabled")
});

Then(/^I can see waist units placeholder$/, () => {
    return client.waitForElementPresent('#waist_units_select', 3000)
});

Then(/^I can see waist slider lower limit "([^"]*)"$/, async llimit => {
    client.execute(function () {
        $(window).scrollTop($('#waist_slider_lower_limit').offset().top - ($(window).height() / 2));
    }, []);
    client.waitForElementPresent('#waist_slider_lower_limit', 3000)
    // return client.assert.containsText('#waist_slider_lower_limit', llimit)
    return client.expect.element('#waist_slider_lower_limit').text.to.equal(llimit)
});

Then(/^I can see waist slider upper limit "([^"]*)"$/, async ulimit => {
    client.waitForElementPresent('#waist_slider_upper_limit', 3000)
    // return client.assert.containsText('#waist_slider_upper_limit', ulimit)
    return client.expect.element('#waist_slider_upper_limit').text.to.equal(ulimit)
});

Then(/^I can see waist slider$/, () => {
    return client.waitForElementPresent('#waist_slider', 3000)
});

Then(/^I enter Circ. "([^"]*)"$/, res => {
    client.clearValue('#waist')
    return client.setValue('#waist', res)

});

Then(/^I assert Circ. value "([^"]*)"$/, res => {
    client.moveToElement('#waist_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
    return client.getValue('#waist', value => {
        var obj = JSON.parse(JSON.stringify(value))
        // value = new Object(obj.value).toString()
        client.assert.strictEqual(obj.value, res)
    });

});

Then(/^I change units to "([^"]*)"$/, unit => {
    client.execute(function () {
        $(window).scrollTop($('#waist_units_select').offset().top - ($(window).height() / 2));
    }, []);
    return client.moveToElement('#waist_units_select option[value='+unit+']', 0, 0)
    .click('#waist_units_select option[value='+unit+']')
    .pause(1000)
    .perform()

});

Then(/^I can see waist output cell shows "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#waist_output_cell_value').offset().top - ($(window).height() / 2));
    }, []);
    client.moveToElement('#waist_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()

    client.pause(5000)
    return client.getText('#waist_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#waist_output_cell_value').text.to.equal(res)
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
    // return client.assert.containsText('#waist_output_cell_value', res)
    // return client.expect.element('#waist_output_cell_value').text.to.equal(res)
});

Then(/^I check Circ. summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#waist_summary_value', res)
    return client.expect.element('#waist_summary_value').text.to.equal(res)
});

Then(/^I check Circ. summary "([^"]*)"$/, res => {
    return client.getText('#waist_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#waist_summary').text.to.equal(res)
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
    // return client.assert.containsText('#waist_summary', res)
    // return client.expect.element('#waist_summary').text.to.equal(res)
});
