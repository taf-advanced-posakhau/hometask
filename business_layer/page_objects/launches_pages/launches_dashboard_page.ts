import { DataTable } from "@wdio/cucumber-framework";
import { yellow } from "colors";
import { _ecx, _skx } from "../../../core_layer/utilities/aliases"
import { assertEqualValues } from "../../../core_layer/utilities/assertions";

export class LaunchesDashboardPage {
    public setFilterName = async ( value : string ) : Promise <void> => {
        await _skx ( `//input[@placeholder='Enter name']` , value );
    }

    public clickLaunchesSectionButton = async ( value : string ) : Promise <void> => {
         await _ecx ( `//button[@type='button' and @title='${value}']`);
    }

    public clickTestSuiteByNumber = async ( value : string ) : Promise <void> => {
        await _ecx ( `//span[text()='${value}']/parent::a/parent::span/parent::div/parent::div/parent::div/parent::div` );
    } 

    public getLaunchesTableHeaderElement  = async ( value : string ) => {
        return await $(`//span[text()='${value}']`);
    }

    public isTableHeaderElementDisplayed = async ( table : DataTable ) : Promise <void> => {      
        let data = table.raw();
        for (const value of data) {         
            let currentElement = await $(`//span[text()='${value}']`);
            await assertEqualValues (  ( await currentElement.isDisplayed() ) , true)
        };
    }

    public verifyElementsPresence  = async ( arrayOfValues : any ) => {
        for ( let i=0;i<await arrayOfValues.length;++i ) {
            console.log ( `VERIFYING PRESENCE OF THE ELEMENT ${ yellow ( arrayOfValues [i])} .... ` );     
            await assertEqualValues ( await ( await this.getLaunchesTableHeaderElement( arrayOfValues[i]) ).isDisplayed()  , true );        
        } 
    }
    
    public verifyAmountOfRunResults  = async ( value : number ) => {
        let amountOfRunsElementsContainer = await $$ ( `//span[text()='Demo Api Tests']` );
        let amountOfRuns : number = amountOfRunsElementsContainer.length;
        console.log (`Amount of displayed test runs on launches dashboard page - ${ yellow ( `${ amountOfRuns } `)}`);
        await assertEqualValues ( amountOfRuns , value );        
    } 
}