Feature: Calculator full result for healthy Male
    This test assert health person COVID AGE result
@Test_Full_Biometric
Scenario: Healthy male result
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
  When I enter the weight "166"
  When I enter Circ. "35"
  When I change cigaretts amount to "0"
  Then I see Smoking placeholder with "00y 00m 00d"
  When I enter Systolic "120"
  When I enter diastolic "80"
  Then I check outpot Blood Pressure "- 00y 00m 18d"
  When I enter Vitamin D Level "33"
  And I see Vitamin D Level output "- 00y 04m 01d"
  When I enter FMD "14"
  Then I see AngioDefender output "- 03y 02m 21d"
  When I enter A1c "5"
  Then I see A1c output "- 02y 03m 03d"
  When I enter Triglyceride "35" 
  When I enter HDL-C "33"
  When I enter LDL-C "43"
  And I see Hospitality value equal "2.57"
  And I see ICU Admision value equal "0.46"
  And I see Mortality value equal "0.06"
  And I see Calculated age years "33y"
  And I see Calculated age month "10m"
  And I see Calculated age days "28d"
   And I close all