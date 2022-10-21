import { USER } from "../../core_layer/constants/constants";
import { _ecx, _skx } from '../../core_layer/utilities/aliases';

export class LoginPage {

    private user;

    public loginUser = async ( value : string ) : Promise <void> => {
        if ( value == 'default') {
           this.user = USER.default;
           await this.performLogin ( this.user );
        } else if ( value == 'superadmin') {
            this.user = USER.superadmin;
            await this.performLogin ( this.user );
        } else {
            throw new Error ( `Unknown user role - ${value}` );
        }    
    }

    public loginUserAsObject = async ( user ) : Promise <void> => {
        await this.performLogin ( user );
    }

    private performLogin = async ( user : any) : Promise <void> => {        
        await this.setUsername ( user.username ); 
        await this.setPassword ( user.password );
        await this.clickLoginButton();         
    }

    private setUsername = async ( value : string ) : Promise <void> => {
        await _skx ( `//input[@name='login']` , value );          
    }

    private setPassword = async ( value : string ) : Promise <void> => {
        await _skx ( `//input[@name='password']` , value );          
    }

    private clickLoginButton = async () : Promise <void> => {
        await _ecx ( `//button[text()='Login']` );
    }
}