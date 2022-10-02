# Default User: default\1q2w3e
# Administrator: superadmin\erebus

@SmokeTest
Feature: SMOKE TEST - CREATING NEW FILTER AND VERIFY IT APPEARANCE AT FILTERS DASHBOARD PAGE

        @logout
        Scenario Outline: SMOKE TEST - CREATING NEW FILTER AND VERIFY IT APPEARANCE AT FILTERS DASHBOARD PAGE

             When browser navigated to primary url
              And "<user>" user logged to reportportal
              And browser navigated to "<navigation_link>"
              And user clicks -Filters- button at left sidebar menue
              And user removes "<filter>" if exists at filters dashboard page
              And user click -Add filter- button at filters dashboard page
              And user set value "<filter>" in launch name section at launches dashboard page
              And user clicks "Save" button in launch name section at launches dashboard page
              And user set value "<filter>" in name field on add filter popup page
              And user clicks -Add- button on add filter popup page
              And user clicks -Filters- button at left sidebar menue
             Then filter "<filter>" is present on the filters dashboard page
 
        Examples:
                  | user    | filter       | navigation_link                                      |
                  | default | smoke_filter | http://localhost:8080/ui/#default_personal/dashboard |