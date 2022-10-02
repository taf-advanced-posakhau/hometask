import { Then, When } from "@wdio/cucumber-framework";
import { FiltersDashboardPage } from '../../page_objects/filters_pages/filters_dashboard_page';

const filtersDashboardPage : FiltersDashboardPage = new FiltersDashboardPage ();


When ( /^user click -Add filter- button at filters dashboard page$/ , async () => {
    await filtersDashboardPage.clickAddFilterButton ();
});

When ( /^filter "(.*)" is present on the filters dashboard page$/ , async ( value : string ) => {
    await filtersDashboardPage.isFilterPresent ( value );
});

When ( /^user removes "(.*)" if exists at filters dashboard page$/ , async ( value : string ) => {
    await filtersDashboardPage.removeFilterIfExist ( value );
});




