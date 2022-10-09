import { yellow } from "colors";
import { _ecx, _skx } from "../../../core_layer/utilities/aliases"

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
        return $(`//span[text()='${value}']`);
    }
}