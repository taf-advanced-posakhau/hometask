import { bgRed, yellow } from "colors";

export class User {
    private superadmin = {
        username : "superadmin",
        password : "erebus"
    }

    private default = {
        username: 'default',
        password: '1q2w3e'
    }

    public getUser = async ( value : string ) : Promise <any> => {
        if ( value == 'superadmin') {
            return this.superadmin;
        } else if ( value == 'default' ) {
            return this.default;
        } 
        else {
            throw new Error ( `${bgRed ( yellow ( `UNKNOWN USER ROLE - ${value}! ` ))}` );
        } 
    }
}