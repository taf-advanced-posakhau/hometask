import { Then, When } from '../../../node_modules/@wdio/cucumber-framework/build/index';
import { LoginPage } from '../../page_objects/login_page';

const reportportalLoginPage : LoginPage = new LoginPage ();

When( /"(.*)" user logged to reportportal/ , async ( value : string ) => {
    await reportportalLoginPage.loginUser ( value );
});

