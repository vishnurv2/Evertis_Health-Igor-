Feature: Calculator full result max age 122
    This test assert unhealthy person COVID AGE result
@Test_Full_Biometric
@weekly_regression
Scenario: Calculator full result max age 122
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
  When I enter Vitamin D Level "15"
  And I see Vitamin D Level output "+ 22y 02m 08d"
  When I enter FMD "3"
  Then I see AngioDefender output "+ 07y 09m 09d"
  When I enter A1c "7"
  Then I see A1c output "+ 11y 10m 05d"
  When I enter Triglyceride "400" 
  When I enter HDL-C "89"
  When I enter LDL-C "200"
  And I see Hospitality value equal "14"
  And I see ICU Admision value equal "9.4"
  And I see Mortality value equal "9.5"
  And I see Calculated age years "110y"
  And I see Calculated age month "10m"
  And I see Calculated age days "15d"
  When I check Chronic lung disease checkboxes
  And I see Calculated age years "122y"
  And I see Calculated age month "00m"
  And I see Calculated age days "00d"
  When I check Chronic kidney disease checkboxes
  And I see Calculated age years "122y"
  And I see Calculated age month "00m"
  And I see Calculated age days "00d"
  When I change cigaretts amount to "0"
  And I see Calculated age years "122y"
  And I see Calculated age month "00m"
  And I see Calculated age days "00d"
  When I check Chronic kidney disease checkboxes
  And I see Calculated age years "115y"
  And I see Calculated age month "10m"
  And I see Calculated age days "25d"
  When I check Cardiovascular disease checkboxes
  And I see Calculated age years "122y"
  And I see Calculated age month "00m"
  And I see Calculated age days "00d"
  When I check Immunocompromised checkboxes
  And I see Calculated age years "122y"
  And I see Calculated age month "00m"
  And I see Calculated age days "00d"
  And I close all