const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see Cigarettes day placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#smoking').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#smoking', "disabled")
});

Then(/^I can see Cigarettes slider$/, () => {
    return client.waitForElementPresent('#smoking_slider', 3000)
});

Then(/^I can see Cigarettes slider lower limit "([^"]*)"$/, res => {
    client.waitForElementPresent('fieldset.smoking-section .is-min', 3000)
    // return client.assert.containsText('fieldset.smoking-section .is-min', res)
    return client.expect.element('fieldset.smoking-section .is-min').text.to.equal(res)
});

Then(/^I can see Cigarettes slider upper limit "([^"]*)"$/, res => {
    client.waitForElementPresent('fieldset.smoking-section .is-max', 3000)
    // return client.assert.containsText('fieldset.smoking-section .is-max', res)
    return client.expect.element('fieldset.smoking-section .is-max').text.to.equal(res)
});

Then(/^I see Smoking placeholder with "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#smoking_output_cell_value').offset().top - ($(window).height() / 2));
    }, []);
    client.moveToElement('#smoking_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(500)
    .perform()

    return client.getText('#smoking_output_cell_value', function(result) {
    var obj = JSON.parse(JSON.stringify(result))
       var res_exp = res.split(" ", 4)
       var res_curr = result.value.split(" ", 4)
   
       console.log(res_exp+ " - expected")
       console.log(res_curr+ " - actually")
       if(res === "N/A")
       {
            client.expect.element('#smoking_output_cell_value').text.to.equal(res)
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

// return client.assert.containsText('#smoking_output_cell_value', res)
//    return client.expect.element('#smoking_output_cell_value').text.to.equal(res)
});

When(/^I change cigaretts amount to "([^"]*)"$/, res => {

    client.execute(function () {
        $(window).scrollTop($('#smoking').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#smoking', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)
    // .pause(5000)

    client.clearValue('#smoking')
    return client.setValue('#smoking', res)
});

When(/^I change cigaretts amount to maximum "([^"]*)"$/, res => {

    client.clearValue('#smoking')
    return client.setValue('#smoking', res)
});

Then(/^I see amount changed back to maximum$/, () => {
    client.moveToElement('#smoking_output_cell_value', 0, 0)
    .mouseButtonClick('left')
    .pause(3000)
    .perform()
    // console.log()
    return client.getValue('#smoking', obj => {
        var obj = JSON.parse(JSON.stringify(obj))
        // // value = new Object(obj.value).toString()
        // console.log("*******Smoking parameters - "+obj.value)
        client.assert.strictEqual(obj.value, "40")
    });
});

Then(/^I check Smoking summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#smoking_summary_value', res)
    return client.expect.element('#smoking_summary_value').text.to.equal(res)
});

Then(/^I check Smoking summary "([^"]*)"$/, res => {
    return client.getText('#smoking_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#smoking_summary').text.to.equal(res)
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
    // return client.assert.containsText('#smoking_summary', res)
    // return client.expect.element('#smoking_summary').text.to.equal(res)
});


function compareAge(expAge, currAge){
    var res_exp = expAge.split(" ", 4)
    var res_curr = currAge.split(" ", 4)

    console.log(res_exp)
    console.log(res_curr)
    client.assert(res_curr[0], res_exp[0])
    client.assert(res_curr[1], res_exp[1])
    client.assert(res_curr[2], res_exp[2])
    var tmp_curr = parseInt(res_curr[3], 10)
    var tmp_exp = parseInt(res_exp[3], 10)
    console.log(tmp_exp)
    console.log(tmp_curr)
    if(tmp_curr === tmp_exp){
        return client.assert(true)
    } else {
        return client.assert(false)
        }

}