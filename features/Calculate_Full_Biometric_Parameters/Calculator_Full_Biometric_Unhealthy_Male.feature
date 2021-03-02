Feature: Calculator full result for unhealthy Male
    This test assert unhealthy person COVID AGE result
@Test_Full_Biometric
@weekly_regression
Scenario: Unhealthy male result
  Given I open COVIDAge Risk Calculator home page "https://calculator.qa.everisthealth.net"
  Given I am on the video page
  When I click get started
  Then I am on the welcome page
  Then I select country "Canada"
  And I type proper postal code "L4J 8X1"
  Then I assert green checkmark
  And I assert city name "Thornhill, ON"
  When I click on button ACCEPT
  When I select Month
  When I select Day
  When I select Year
  When I can select Male
  Then I activate fields
  When I enter the height "69"
  When I enter the weight "217"
  When I enter Circ. "47"
  When I change cigaretts amount to "20"
  Then I see Smoking placeholder with "+ 09y 08m 24d"
  When I enter Systolic "150"
  When I enter diastolic "95"
  Then I check outpot Blood Pressure "+ 04y 11m 11d"
  When I enter Vitamin D Level "18"
  And I see Vitamin D Level output "+ 16y 03m 25d"
  When I enter FMD "2"
  Then I see AngioDefender output "+ 08y 09m 10d"
  When I enter A1c "7"
  Then I see A1c output "+ 11y 10m 05d"
  When I enter Triglyceride "400" 
  When I enter HDL-C "89"
  When I enter LDL-C "200"
  And I see Hospitality value equal "14"
  And I see ICU Admision value equal "8.6"
  And I see Mortality value equal "7.3"
  And I see Calculated age years "106y"
  And I see Calculated age month "00m"
  And I see Calculated age days "02d"
  And I close all