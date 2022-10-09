import { LoginPage } from '../../../business_layer/page_objects/login_page';
import { LeftSidebarMenuPage } from '../../../business_layer/page_objects/left_sidebar_menu_page';
import { LaunchesDashboardPage } from '../../../business_layer/page_objects/launches_pages/launches_dashboard_page';
import { green, yellow } from 'colors';
const loginPage : LoginPage = new LoginPage ();
const leftSidebarMenuPage : LeftSidebarMenuPage = new LeftSidebarMenuPage ();
const launchesDashboardPage : LaunchesDashboardPage = new LaunchesDashboardPage ();

describe('browser login to reportportal', async () => {

    it('should login to reportportal and go to the launches page, and then click suite 10', async () => {

        await browser.url(`http://localhost:8080`);
        console.log ( `Navigated to primary URL : ${yellow( `http://localhost:8080` )} ... ` );
        await loginPage.loginUser ( `default`);  
    
        await browser.url( `http://localhost:8080/ui/#default_personal/dashboard` );
        console.log ( `Navigated to default profile dashboard user ...` );
        await browser.pause(1.5 * 1000);
    
        await leftSidebarMenuPage.clickLaunchesButton();
        console.log ( `Clicked -Launches- button at left menu pannel ...` );
        await browser.pause(1.5 * 1000); 

        await launchesDashboardPage.clickTestSuiteByNumber (`10`);
        console.log ( `Clicked on test suite number : ${yellow( `10` )} ... ` );
        await browser.pause(1.5 * 1000); 
    });
});

describe('Headers table elements presence verification in test suite', async () => {
 
    let launchesTableHeadElementNamesArray = [
        `start time`,
        `total`,
        `passed`,
        `failed`,
        `skipped`,
        `product bug`,
        `auto bug`,
        `system issue`,
        `to investigate`        
    ];

    launchesTableHeadElementNamesArray.forEach(async function verifyElement(arrayElement){      

        it('verify that table elements is preesent at launches dashboard page', async () => {
            await expect(launchesDashboardPage.getLaunchesTableHeaderElement( arrayElement )).toBeExisting();
            console.log ( `Presence of element ${green( `${arrayElement}`)} is verified. ` );
        });        
    });    
});