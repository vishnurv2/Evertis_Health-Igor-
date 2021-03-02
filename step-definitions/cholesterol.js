
const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I can see Triglyceride placeholder disabled$/, () => {
    client.execute(function () {
        $(window).scrollTop($('#lipids_tg').offset().top - ($(window).height() / 2));
    }, []);
    return client.getAttribute('#lipids_tg', "disabled")
});

Then(/^I can see HDL-C placeholder disabled$/, () => {
    return client.getAttribute('#lipids_hdlc', "disabled")
});

Then(/^I can see LDL-C placeholder disabled$/, () => {
    return client.getAttribute('#lipids_ldlc', "disabled")
});

Then(/^I see Cholesterol output "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#lipids_output_cell_value').offset().top - ($(window).height() / 2));
    }, []);

    return client.getText('#lipids_output_cell_value', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#lipids_output_cell_value').text.to.equal(res)
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
    // return client.assert.containsText('#lipids_output_cell_value', val)
    // return client.expect.element('#lipids_output_cell_value').text.to.equal(val)
});

Then(/^I enter HDL-C "([^"]*)"$/, val => {
    client.execute(function () {
        $(window).scrollTop($('#lipids_hdlc_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#lipids_hdlc_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)

    client.clearValue('#lipids_hdlc')
    return client.setValue('#lipids_hdlc', val)
});  

Then(/^I enter Triglyceride "([^"]*)"$/, val => {

    client.execute(function () {
        $(window).scrollTop($('#lipids_tg_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#lipids_tg_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)

    client.clearValue('#lipids_tg')
    return client.setValue('#lipids_tg', val)
});

Then(/^I enter LDL-C "([^"]*)"$/, val => {
    client.execute(function () {
        $(window).scrollTop($('#lipids_ldlc_slider').offset().top - ($(window).height() / 2));
    }, []);

    // return client.moveToElement('#lipids_ldlc_slider', parseInt(res), 0)
    // .pause(100)
    // .mouseButtonClick(0)
    // .pause(5000)

    client.clearValue('#lipids_ldlc')
    return client.setValue('#lipids_ldlc', val)
}); 

Then(/^I check Cholesterol summary value "([^"]*)"$/, res => {
    client.execute(function () {
        $(window).scrollTop($('#lipids_summary_value').offset().top - ($(window).height() / 2));
    }, []);
    // return client.assert.containsText('#lipids_summary_value', res)
    return client.expect.element('#lipids_summary_value').text.to.equal(res)
});

Then(/^I check Cholesterol summary "([^"]*)"$/, res => {
    return client.getText('#lipids_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#lipids_summary').text.to.equal(res)
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
    // return client.assert.containsText('#lipids_summary', res)
    // return client.expect.element('#lipids_summary').text.to.equal(res)
});