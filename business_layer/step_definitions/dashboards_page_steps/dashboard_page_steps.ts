import { Then, When } from "@wdio/cucumber-framework";
import { DashboardPage } from "../../page_objects/dashboard_pages/dashboard_page";
import { DashboardsListPage } from '../../page_objects/dashboard_pages/dashboards_list_page';


const dashboardsListPage : DashboardsListPage = new DashboardsListPage();
const dashboardPage : DashboardPage = new DashboardPage();

When ( /^user clicks on dashboard "(.*)"$/ , async ( value : string ) => {
    await dashboardsListPage.clickDashboard( value );
});

When ( /^user obtains position property for the widget which should move when another widget be resized$/ , async () => {
    await dashboardPage.getPositionBeforeResizing();
});

When ( /^user resizes widget to position x "(.*)" y "(.*)"$/ , async ( x : number , y : number ) => {
    await dashboardPage.resizeWidget ( x, y );
});

When ( /^user obtains position property after moving the widget which should move when another widget be resized$/ , async () => {
    await dashboardPage.getPositionAfterResizing();
});

When ( /^movable element was moved after widget resizing operation$/ , async () => {
    await dashboardPage.assertMovement();
});

When ( /^user resizes widget back to position x "(.*)" y "(.*)"$/ , async ( x : number , y : number ) => {
    await dashboardPage.resizeWidgetBack ( x, y );
});

