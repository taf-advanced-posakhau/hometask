import { bgRed } from '../../node_modules/colors';
import { yellow , red } from '../../node_modules/colors';

 

export async function assertTwoArrays(array1:any,array2:any):Promise<string> {
    console.log(`ASSERTION OF ARRAYS - ARRAY: ${array1} COMPARING WITH ARRAY: ${array2}  `);    
    return expect(JSON.stringify(array1)).toEqual(JSON.stringify(array2));  
}

export async function assertEqualValues( expected : any , actual : any ) : Promise <boolean> {
    console.log(`ASSERTION OF VALUES: VALUE -${expected}- COMPARING WITH VALUE -${actual}-  `);    
    if ( expected == actual) {
        return true;
    } else {
        throw new Error ( bgRed ( yellow ( `VALUES DID NOT MATCH! EXPECTED VALUE 1 -${expected}- IS NOT EQUAL TO ACTUAL VALUE 2 -${actual}-` ) ) );
    }
}

export async function assertNotEqualValues( expected : any , actual : any ) : Promise <boolean> {
    console.log(`ASSERTION OF VALUES: VALUE ${expected} COMPARING WITH VALUE ${actual}  `);    
    if ( expected !== actual) {
        return true;
    } else {
        throw new Error ( bgRed ( yellow ( `VALUES MATCH! VALUE ${expected} IS EQUAL TO VALUE ${actual}` ) ) );
    }
}