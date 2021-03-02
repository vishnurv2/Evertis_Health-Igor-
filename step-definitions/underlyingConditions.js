const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');


Then(/^I can see undrlying output cell shows "([^"]*)"$/, res => {
    client.pause(500)
    return client.getText('#underlying_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#underlying_output_cell_value').text.to.equal(res)
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
    // return client.assert.containsText('#underlying_output_cell_value', res)
    // return client.expect.element('#underlying_output_cell_value').text.to.equal(res)
});

Then(/^I can see Chronic kidney disease checkboxes disabled$/, () => {
    return client.getAttribute('[for="underlying_kidney"]', "disabled")
});
Then(/^I can see Cardiovascular disease checkboxes disabled$/, () => {
    return client.getAttribute('[for="underlying_cardio"]', "disabled") 
});
Then(/^I can see Chronic lung disease checkboxes disabled$/, () => {
    return client.getAttribute('[for="underlying_chronic_lung"]', "disabled") 
});
Then(/^I can see Immunocompromised checkboxes disabled$/, () => {
    return client.getAttribute("[for='underlying_immuno']", "disabled") 
});


When(/^I check Chronic kidney disease checkboxes$/, () => {
    client.execute(function () {
        $(window).scrollTop($('[for="underlying_kidney"]').offset().top - ($(window).height() / 2));
    }, []);
    return client.moveToElement('[for="underlying_kidney"]', 0, 0)
    .click('[for="underlying_kidney"]')
    .pause(500)
    .perform()
});

Then(/^I assert undrlying output cell changed$/, () => {
    return client.expect.element('#gender_output_cell_value').text.to.not.contain("N/A").before(3000)
});


When(/^I check Cardiovascular disease checkboxes$/, () => {
    client.execute(function () {
        $(window).scrollTop($('[for="underlying_cardio"]').offset().top - ($(window).height() / 2));
    }, []);
    return client.moveToElement('[for="underlying_cardio"]', 0, 0)
    .click('[for="underlying_cardio"]')
    .pause(1500)
    .perform()
});

When(/^I check Chronic lung disease checkboxes$/, () => {
    client.execute(function () {
        $(window).scrollTop($('[for="underlying_chronic_lung"]').offset().top - ($(window).height() / 2));
    }, []);
    return client.moveToElement('[for="underlying_chronic_lung"]', 0, 0)
    .click('[for="underlying_chronic_lung"]')
    .pause(1500)
    .perform()
});

When(/^I check Immunocompromised checkboxes$/, () => {
    client.execute(function () {
        $(window).scrollTop($('[for="underlying_immuno"]').offset().top - ($(window).height() / 2));
    }, []);
    return client.moveToElement('[for="underlying_immuno"]', 0, 0)
    .click('[for="underlying_immuno"]')
    .pause(1500)
    .perform()
});

Then(/^I check undrlying summary value "([^"]*)"$/, res => {
    return client.getText('#underlying_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#underlying_summary').text.to.equal(res)
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
    // return client.assert.containsText('#underlying_summary', val)
    return client.expect.element('#underlying_summary').text.to.equal(val)
});