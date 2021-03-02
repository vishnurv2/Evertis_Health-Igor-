const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I see year_select dropbox with selected "([^"]*)"$/, year => {
    // return client.assert.containsText('#year_select>option[value="-1"]', "Year")
    return client.expect.element('select#year_select > [selected]').text.to.equal("-")

});

Then(/^I see day_select dropbox with selected "([^"]*)"$/, day => {
    // return client.assert.containsText('#day_select>option[value="-1"]', "Day")
    return client.expect.element('select#day_select > [selected]').text.to.equal("-")

});
Then(/^I see month_select dropbox with selected "([^"]*)"$/, month => {
    // return client.assert.containsText('#month_select>option[value="-1"]', "Month")
    return client.expect.element('select#month_select > [selected]').text.to.equal("-")
});

Then(/^I see age placeholder value "([^"]*)"$/, res => {
    // return client.assert.containsText('#actual_age_output_cell_value', res)
    // return client.expect.element('#actual_age_output_cell_value').text.to.equal(res)
    return client.getText('#actual_age_output_cell_value', function(result) {
    var obj = JSON.parse(JSON.stringify(result))
       var res_exp = res.split(" ", 4)
       var res_curr = result.value.split(" ", 4)
   
       console.log(res_exp+ " - expected")
       console.log(res_curr+ " - actually")
       if(res === "N/A")
       {
            client.expect.element('#actual_age_output_cell_value').text.to.equal(res)
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
});

When(/^I select Month$/, () => {
    client.pause(500)
    var month = new Date().getMonth() + 1
    var select = "select#month_select > [value='"+month.toString()+"']"
    return client.click(select)
});

When(/^I select Day$/, () => {
    client.pause(500)
    var day = new Date().getDate().toString()
    var select = "select#day_select > [value='"+day.toString()+"']"
    return client.click(select)
});

When(/^I select Year$/, () => {
    client.pause(500)
    var year = new Date().getFullYear() - 40
    var select = "select#year_select > [value='"+year.toString()+"']"
    return client.click(select)
});

Then(/^I check D0B summary value "([^"]*)"$/, res => {
    // return client.assert.containsText('#birthday_summary', res)
    // return client.expect.element('#birthday_summary').text.to.equal(res)
    return client.getText('#birthday_summary', function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 4)
           var res_curr = result.value.split(" ", 4)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#birthday_summary').text.to.equal(res)
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
});