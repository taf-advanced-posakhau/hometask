import { _ecx, _skx } from "../../../core_layer/utilities/aliases"

export class LaunchesDashboardPage {
    public setFilterName = async ( value : string ) : Promise <void> => {
        await _skx ( `//input[@placeholder='Enter name']` , value );
    }

    public clickLaunchesSectionButton = async ( value : string ) : Promise <void> => {
         await _ecx ( `//button[@type='button' and @title='${value}']`);
    }

    
}