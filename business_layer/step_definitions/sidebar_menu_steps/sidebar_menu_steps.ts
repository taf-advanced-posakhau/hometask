import { Then } from '@wdio/cucumber-framework';
import { LeftSidebarMenuPage } from '../../page_objects/left_sidebar_menu_page';

const leftSidebarMenuPage : LeftSidebarMenuPage = new LeftSidebarMenuPage ();

Then ( /^user clicks -Filters- button at left sidebar menue$/ , async () => {
    leftSidebarMenuPage.clickFilterButton(); 
});

Then ( /^user clicks -Launches- button at left sidebar menue$/ , async () => {
    leftSidebarMenuPage.clickLaunchesButton(); 
});

