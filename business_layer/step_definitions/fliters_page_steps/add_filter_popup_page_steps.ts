import { Then, When } from "@wdio/cucumber-framework";
import { AddFilterPage } from '../../page_objects/launches_pages/add_filter_page';

const addFilterPage : AddFilterPage = new AddFilterPage ();

When ( /^user set value "(.*)" in name field on add filter popup page$/ , async ( value : string ) => {
    await addFilterPage.setFilterName ( value );
});

When ( /^user set value "(.*)" in description field on add filter popup page$/ , async ( value : string ) => {
    await addFilterPage.setDescription ( value );
});

When ( /^user clicks -Add- button on add filter popup page$/ , async () => {
    await addFilterPage.clickAddButton();
});

When ( /^user clicks -Cancel- button on add filter popup page$/ , async () => {
    await addFilterPage.clickCancelButton();
});