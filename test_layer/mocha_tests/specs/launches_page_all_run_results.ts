import { LoginPage } from '../../../business_layer/page_objects/login_page';
import { LeftSidebarMenuPage } from '../../../business_layer/page_objects/left_sidebar_menu_page';
import { LaunchesDashboardPage } from '../../../business_layer/page_objects/launches_pages/launches_dashboard_page';
import { green, yellow } from 'colors';
const loginPage : LoginPage = new LoginPage ();
const leftSidebarMenuPage : LeftSidebarMenuPage = new LeftSidebarMenuPage ();
const launchesDashboardPage : LaunchesDashboardPage = new LaunchesDashboardPage ();

describe('browser login to reportportal', async () => {

    it('should login to reportportal and go to the launches page', async () => {

        await browser.url(`http://localhost:8080`);
        console.log ( `Navigated to primary URL : ${yellow( `http://localhost:8080` )} ... ` );
        await loginPage.loginUser ( `default`);  
    
        await browser.url( `http://localhost:8080/ui/#default_personal/dashboard` );
        console.log ( `Navigated to default profile dashboard user ...` );
        await browser.pause(1.5 * 1000);
    
        await leftSidebarMenuPage.clickLaunchesButton();
        console.log ( `Clicked -Launches- button at left menu pannel ...` );
        await browser.pause(1.5 * 1000);       
    });
});

describe('launches dashboard page should represent 10 run results', async () => { 
        it('verify that launches dashboard page should represent 10 run results', async () => {
            let amountOfRunsElementsContainer = await $$ ( `//span[text()='Demo Api Tests']` );
            let amountOfRuns : number = amountOfRunsElementsContainer.length;
            console.log (`Amount of displayed test runs on launches dashboard page - ${ yellow ( `${ amountOfRuns } `)}`);
            expect(amountOfRuns).toEqual(10);             
        });
});