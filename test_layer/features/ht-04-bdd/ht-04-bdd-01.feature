
@Hometask.Module04-BDD
Feature: Hometask 04 - BDD. Verification of the presence of the table headers elements at the launches page - 01

        Background:
                    
            Given browser navigated to primary url
              And user "default" logged in to reportportal
              And browser navigated to "http://localhost:8080/ui/#default_personal/dashboard"
              And user clicks -Launches- button at left sidebar menue
              And pause "5" seconds
 
              
        Scenario: Hometask 04 - BDD. Verification of the presence of the table headers elements at the launches page - 01
           
             Then column name header element is displayed in header table at launches dashboard page
                  | start time     |
                  | total          |
                  | passed         |
                  | failed         |
                  | skipped        |
                  | product bug    |
                  | auto bug       |
                  | system issue   |
                  | to investigate |

 