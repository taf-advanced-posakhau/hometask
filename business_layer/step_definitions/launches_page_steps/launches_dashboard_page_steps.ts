
import { LaunchesDashboardPage } from '../../page_objects/launches_pages/launches_dashboard_page';
import { Then, When, DataTable } from '@wdio/cucumber-framework';

const launchesDashboardPage : LaunchesDashboardPage = new LaunchesDashboardPage ();

When ( /^user set value "(.*)" in launch name section at launches dashboard page$/ , async ( value : string ) => {
    await launchesDashboardPage.setFilterName ( value );
});

When ( /^user clicks "(.*)" button in launch name section at launches dashboard page$/ , async ( value : string ) => {
    await launchesDashboardPage.clickLaunchesSectionButton ( value );
});

When(/^column name header element is displayed in header table at launches dashboard page$/, async (table: DataTable) => { 
    await launchesDashboardPage.isTableHeaderElementDisplayed ( table );
});

When ( /^user clicks test suite with number "(.*)" at launches dashboard page$/ , async ( value : string ) => {
    await launchesDashboardPage.clickTestSuiteByNumber ( value );
});

Then ( /^headers table elements such as "(.*)" presents on test suite page$/ , async ( value : string ) => {
    let arrayOfValues = value.split(`,`);
    await launchesDashboardPage.verifyElementsPresence ( arrayOfValues );
});

Then ( /^verify that launches dashboard page should represent "(.*)" run results$/ , async ( value : number ) => {   
    await launchesDashboardPage.verifyAmountOfRunResults ( value );
});
