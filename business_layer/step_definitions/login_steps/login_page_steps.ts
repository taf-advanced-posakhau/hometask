import { ListFormat } from 'typescript';
import { User } from '../../../core_layer/constants/user';
import { defineParameterType, defineStep, Given, Then, When } from '../../../node_modules/@wdio/cucumber-framework/build/index';
import { LoginPage } from '../../page_objects/login_page';

const reportportalLoginPage : LoginPage = new LoginPage ();

When( /"(.*)" user logged to reportportal/ , async ( value : string ) => {
    await reportportalLoginPage.loginUser ( value );
});

defineParameterType({
    regexp: /"([^"]*)"/,
    transformer: function(userType) {
        let user = new User();
        return user.getUser (userType);
    },
    name: "user",
    useForSnippets: false
});

Given ('user {user} logged in to reportportal', async function ( user : any ) {
    await reportportalLoginPage.loginUserAsObject ( user ); 
});
 