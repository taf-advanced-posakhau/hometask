
@Hometask.Module04-BDD
Feature: Hometask 04 - BDD. Verification of the presence of the table headers elements inside suite page - 02

        Background:
                  
            Given browser navigated to primary url
              And user "default" logged in to reportportal
              And browser navigated to "http://localhost:8080/ui/#default_personal/dashboard"
              And user clicks -Launches- button at left sidebar menue
              And pause "5" seconds
              And user clicks test suite with number "10" at launches dashboard page
              And pause "5" seconds
               
        Scenario: Hometask 04 - BDD. Verification of the presence of the table headers elements inside suite page - 02
           
             Then headers table elements such as "start time,total,passed,failed,skipped,product bug,auto bug,system issue,to investigate" presents on test suite page
               
     