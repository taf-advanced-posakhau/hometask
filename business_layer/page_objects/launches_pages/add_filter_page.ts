import { _ecx, _skx } from "../../../core_layer/utilities/aliases"

export class AddFilterPage {

    public setFilterName = async ( value : string ) : Promise <void> => {
        await _skx ( `//input[@placeholder = "Enter filter name"]` , value );
    }

    public setDescription = async ( value : string ) : Promise <void> => {
        await _skx ( ` //div[@class='CodeMirror-code']` , value );       
    }

    public clickShareOption = async ( value : string ) : Promise <void> => {}

    public clickAddButton = async () : Promise <void> => {
        await _ecx ( `//button[text()='Add']` );        
    }

    public clickCancelButton = async () : Promise <void> => {
        await _ecx ( `//button[text()='Cancel']` );     
    }

}