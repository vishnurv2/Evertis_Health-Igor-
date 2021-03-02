const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see Blood Pressure Systolic placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#systolic_blood_pressure').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#systolic_blood_pressure', "disabled")
});

Then(/^I can see Blood Pressure Diastolic placeholder disabled$/, () => {
    return client.getAttribute('#diastolic_blood_pressure', "disabled")
});

Then(/^I can see Blood Pressure radio button Untreated disabled$/, () => {
    return client.getAttribute('#blood_pressure_untreated', "disabled")
});

Then(/^I can see Blood Pressure radio button Treated disabled$/, () => {
    return client.getAttribute('#blood_pressure_treated', "disabled")
});

When(/^I enter Systolic "([^"]*)"$/, res => {

    client.execute(function () {
        $(window).scrollTop($('#systolic_blood_pressure_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#systolic_blood_pressure_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)

    client.clearValue('#systolic_blood_pressure')
    client.setValue("#systolic_blood_pressure", res)
    return client.moveToElement('#blood_pressure_output_cell_value', -10, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()

});


When(/^I enter diastolic "([^"]*)"$/, res => {

    client.execute(function () {
        $(window).scrollTop($('#diastolic_blood_pressure_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#diastolic_blood_pressure_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)


    client.clearValue('#diastolic_blood_pressure')
    client.setValue('#diastolic_blood_pressure', res)
    return client.moveToElement('#blood_pressure_output_cell_value', -10, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()
});


When(/^I check Treated$/, () => {
    client.pause(1000)
    client.execute(function () {
        $(window).scrollTop($('#treated_select').offset().top - ($(window).height() / 2));
    }, []);
    // var select = "#treated_select > [value='1']"
    return client.click("#treated_select option[value='1']")
});


When(/^I check Untreated$/, () => {
    client.pause(100)
    var select = "#treated_select > [value='0']"
    return client.click(select)  
});


Then(/^I check outpot Blood Pressure "([^"]*)"$/, res => {
    client.pause(1000)
    client.execute(function () {
        $(window).scrollTop($('#blood_pressure_output_cell_value').offset().top - ($(window).height() / 2));
    }, []);

    return client.getText('#blood_pressure_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#blood_pressure_output_cell_value').text.to.equal(res)
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
    // return client.assert.containsText('#blood_pressure_output_cell_value', res)
    // return client.expect.element('#blood_pressure_output_cell_value').text.to.equal(res)
});

Then(/^I assert popup alert "([^"]*)"$/, txt => {
    client.pause(1000)
    client.execute(function () {
        $(window).scrollTop($('#alert_dialog_text').offset().top - ($(window).height() / 2));
    }, []);
    client.expect.element('#alert_dialog_text').text.to.equal(txt)
    return client.click('#alert_dialog_button')
});

Then(/^I check Blood Pressure summary value "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#blood_pressure_summary_value').offset().top - ($(window).height() / 2));
    }, []);
    return client.assert.containsText('#blood_pressure_summary_value', res)
    
});

Then(/^I check Blood Pressure summary "([^"]*)"$/, res => {
    return client.getText('#blood_pressure_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#blood_pressure_summary').text.to.equal(res)
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
    // return client.assert.containsText('#blood_pressure_summary', res)
    // return client.expect.element('#blood_pressure_summary').text.to.equal(res)
});
