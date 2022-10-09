import { INTERACTION_TIMEOUT } from '../../core_layer/constants/constants';
import { _ecx } from '../../core_layer/utilities/aliases';
export class LeftSidebarMenuPage {

    public clickFilterButton = async () : Promise <void> => {
        await _ecx ( `//a[@href='#default_personal/filters']/parent::div/parent::div` );
        await browser.pause (INTERACTION_TIMEOUT *2 );
    }

    public clickLaunchesButton = async () : Promise <void> => {
        await _ecx ( `//a[@href='#default_personal/launches']/parent::div/parent::div` );
        await browser.pause (INTERACTION_TIMEOUT *2 );
    }
}