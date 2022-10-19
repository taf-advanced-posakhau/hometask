
@Hometask.Module04-BDD
Feature: Hometask 04 - BDD. Verification of the presence of the table headers elements at the launches page

        Background:

            Given browser navigated to primary url
              And "default" user logged to reportportal
              And browser navigated to "http://localhost:8080/ui/#default_personal/dashboard"
              And user clicks -Launches- button at left sidebar menue
              And pause "5" seconds
 
              
        Scenario Outline: Hometask 04 - BDD. Verification of the presence of the table headers elements at the launches page
           
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

        Examples:
                  | user    |
                  | default |