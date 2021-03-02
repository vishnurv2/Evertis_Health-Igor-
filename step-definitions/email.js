
const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Then(/^I verify Hospitalization result "([^"]*)"$/, res => {
    return client.expect.element("#templateColumns[valign='top'] > table:nth-of-type(1) tr:nth-of-type(2) > td:nth-of-type(1)").text.to.equal(res)
});

Then(/^I verify ICU Admision result "([^"]*)"$/, res => {
    return client.expect.element("#templateColumns[valign='top'] > table:nth-of-type(2) tr:nth-of-type(2) > td:nth-of-type(1)").text.to.equal(res)
});

Then(/^I verify Mortality result "([^"]*)"$/, res => {
    return client.expect.element("#templateColumns[valign='top'] > table:nth-of-type(3) tr:nth-of-type(2) > td:nth-of-type(1)").text.to.equal(res)
});

Then(/^I verify COVIDAge result "([^"]*)"$/, res => {
    return client.getText("td[bg-color='#FFFFFF'] td:nth-of-type(2)", function(result) {
        var obj = JSON.parse(JSON.stringify(result))
           var res_exp = res.split(" ", 3)
           var res_curr = result.value.split(" ", 3)
       
           console.log(res_exp+ " - expected")
           console.log(res_curr+ " - actually")
           if(res === "N/A")
           {
                client.expect.element('#vitamin_d_summary').text.to.equal(res)
           }else{
                client.assert.equal(res_curr[0], res_exp[0])
                client.assert.equal(res_curr[1], res_exp[1])
                if(res_curr[2] == "00d" && res_exp[2] == "00d"){
                    var tmp_curr = parseInt(res_curr[2], 10)
                    var tmp_exp = parseInt(res_exp[2], 10)
                }else{
                    var tmp_curr = parseInt(res_curr[2], 10)
                    var tmp_exp = parseInt(res_exp[2], 10)
                }   
                console.log(tmp_exp+ " - expected")
                console.log(tmp_curr+ " - actually")
                if(tmp_curr == tmp_exp){
                    client.assert.equal(tmp_exp, tmp_curr)
                } else if ((tmp_curr - tmp_exp) >= 4 || (tmp_curr - tmp_exp) <= -4){
                        console.log(tmp_curr - tmp_exp)
                        client.assert.equal(tmp_exp, tmp_curr)
                // }else if(tmp_curr - 3 < tmp_exp || tmp_curr < tmp_exp - 3){
                //         client.assert.equal(tmp_exp, tmp_curr)
                }
                 else{
                    console.log("In range - "+res_exp)
                    console.log("In range - "+res_curr)
                    }
                }      
         })
    return client.expect.element("td[bg-color='#FFFFFF'] td:nth-of-type(2)").text.to.equal(res)
});
