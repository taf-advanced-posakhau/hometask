import { _ecx } from "../../../core_layer/utilities/aliases"
import { INTERACTION_TIMEOUT } from '../../../core_layer/constants/constants';

export class DeleteFilterPopupPage {
    public clickDeleteFilterButton = async () : Promise <void> => {
        await browser.pause(INTERACTION_TIMEOUT);
        await _ecx ( `//button[text()='Delete']` );
    }
}