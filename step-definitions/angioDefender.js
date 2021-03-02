const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see FMD placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#fmd').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#fmd', "disabled")
});

Then(/^I can see AngioDefender slider$/, () => {
    return client.waitForElementPresent('#fmd_slider', 3000)
});

Then(/^I can see AngioDefender slider lower limit$/, () => {
    return client.waitForElementPresent('#fmd_slider_lower_limit', 3000)
});

Then(/^I can see AngioDefender slider upper limit$/, () => {
    return client.waitForElementPresent('#fmd_slider_upper_limit', 3000)
});

Then(/^I see AngioDefender output "([^"]*)"$/, res => {
    client.moveToElement('#fmd_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()

    return client.getText('#fmd_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#fmd_output_cell_value').text.to.equal(res)
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
    // return client.assert.containsText('#fmd_output_cell_value', val)
    // return client.expect.element('#fmd_output_cell_value').text.to.equal(val)
});

When(/^I enter FMD "([^"]*)"$/, val => {

    client.execute(function () {
        $(window).scrollTop($('#fmd_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#fmd_slider', parseInt(val), 0)
    // .pause(100)
    // .mouseButtonClick(0)

    client.execute(function () {
        $(window).scrollTop($('#fmd').offset().top - ($(window).height() / 2));
    }, []);
    client.clearValue('#fmd')
    return client.setValue('#fmd', val)
});

Then(/^I can see FMD changed to "([^"]*)"$/, val => {
    client.moveToElement('#diabetes_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
    // console.log()
    return client.getValue('#fmd', obj => {
        var obj = JSON.parse(JSON.stringify(obj))
        // // value = new Object(obj.value).toString()
        // console.log("*******Smoking parameters - "+obj.value)
        client.assert.strictEqual(obj.value, val)
    });
});


Then(/^I check AngioDefender summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#fmd_summary_value', res)
    return client.expect.element('#fmd_summary_value').text.to.equal(res)
});

Then(/^I check AngioDefender summary "([^"]*)"$/, res => {
    return client.getText('#fmd_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#fmd_summary').text.to.equal(res)
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
    // return client.assert.containsText('#fmd_summary', res)
    return client.expect.element('#fmd_summary').text.to.equal(res)
});