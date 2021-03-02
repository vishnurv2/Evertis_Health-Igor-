Feature: Calculator full result for unhealthy Female
    This test assert health person COVID AGE result
@Test_Full_Biometric
Scenario: Unhealthy female result
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
  When I can select Female
  Then I activate fields
  When I enter the height "64"
  When I enter the weight "217"
  When I enter Circ. "47"
  When I change cigaretts amount to "20"
  Then I see Smoking placeholder with "+ 09y 08m 24d"
  When I enter Systolic "150"
  When I enter diastolic "95"
  Then I check outpot Blood Pressure "+ 08y 04m 25d"
  When I enter Vitamin D Level "20"
  And I see Vitamin D Level output "+ 12y 10m 15d"
  When I enter FMD "2"
  Then I see AngioDefender output "+ 08y 09m 09d"
  When I enter A1c "7"
  Then I see A1c output "+ 11y 10m 05d"
  When I enter Triglyceride "400" 
  When I enter HDL-C "89"
  When I enter LDL-C "200"
  And I see Hospitality value equal "15"
  And I see ICU Admision value equal "9.6"
  And I see Mortality value equal "10"
  And I see Calculated age years "111y"
  And I see Calculated age month "02m"
  And I see Calculated age days "14d"
  And I close all