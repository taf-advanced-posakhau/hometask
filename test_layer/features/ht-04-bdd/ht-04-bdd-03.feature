
@Hometask.Module04-BDD
Feature: Hometask 04 - BDD. Verification of the amount of run results at the launches dashboard page - 03

        Background:
                    
            Given browser navigated to primary url
              And user "default" logged in to reportportal
              And browser navigated to "http://localhost:8080/ui/#default_personal/dashboard"
              And user clicks -Launches- button at left sidebar menue
              And pause "5" seconds
 
              
        Scenario Outline: Hometask 04 - BDD. Verification of the amount of run results at the launches dashboard page - 03
           
             Then verify that launches dashboard page should represent "<amountOfRuns>" run results

        Examples:
                  | amountOfRuns |
                  | 10           |
                  
