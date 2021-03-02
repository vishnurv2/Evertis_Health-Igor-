Feature: Calculator full result for average Male
    This test assert unhealthy person COVID AGE result
@Test_Full_Biometric1
Scenario: Average male result
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
  When I enter the weight "170"
  When I enter Circ. "39"
  When I change cigaretts amount to "2"
  Then I see Smoking placeholder with "+ 05y 04m 22d"
  When I enter Systolic "130"
  When I enter diastolic "90"
  Then I check outpot Blood Pressure "+ 02y 03m 24d"
  When I enter Vitamin D Level "31"
  And I see Vitamin D Level output "+ 00y 08m 00d"
  When I enter FMD "10"
  Then I see AngioDefender output "+ 00y 09m 09d"
  When I enter A1c "6"
  Then I see A1c output "+ 01y 06m 20d"
  When I enter Triglyceride "150" 
  When I enter HDL-C "89"
  When I enter LDL-C "150"
  And I see Hospitality value equal "5.05"
  And I see ICU Admision value equal "1.5"
  And I see Mortality value equal "0.22"
  And I see Calculated age years "53y"
  And I see Calculated age month "05m"
  And I see Calculated age days "16d"
  And I close all