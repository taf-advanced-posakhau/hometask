
@Hometask.Module06-UI
Feature: Hometask 06 - UI. The other widgets move while resizing - 01
        Background:
                    
            Given browser navigated to primary url
              And user "default" logged in to reportportal
              And browser navigated to "http://localhost:8080/ui/#default_personal/dashboard"
              And user clicks on dashboard "hometask-06-ui"
              
              
        Scenario: Hometask 06 - UI. The other widgets move while resizing - 01
        
              And user obtains position property for the widget which should move when another widget be resized
              And user resizes widget to position x "100" y "100"
              And user obtains position property after moving the widget which should move when another widget be resized
             Then movable element was moved after widget resizing operation
              And user resizes widget back to position x "-100" y "-100"
 
           