import { INTERACTION_TIMEOUT } from '../../../core_layer/constants/constants';
import { _ecx, _is_edsplx } from '../../../core_layer/utilities/aliases';
import { DeleteFilterPopupPage } from './delete_filter_popup_page';

const deleteFilterPopupPage : DeleteFilterPopupPage = new DeleteFilterPopupPage();

export class FiltersDashboardPage {
    public clickAddFilterButton = async () : Promise <void> => {
        await _ecx ( `//span[text()='Add filter']/..` );
        await browser.pause(INTERACTION_TIMEOUT);   
    }

    public isFilterPresent = async ( value : string ) : Promise <void> => {
        await _is_edsplx ( `//span[text()='${value}']` );
    }

    public removeFilterIfExist = async ( value : string ) : Promise <void> => {
        await browser.pause(INTERACTION_TIMEOUT*3);
        let filter = await $$ ( `//span[text()='${value}']` );

        if ( await filter.length > 0) {
            console.log ( `FILTER ${value} HAVE FOUND. REMOVING ... ` );
            const trashIcon = await $$ ( `//span[text()='smoke_filter']/parent::a/parent::span/parent::div/following-sibling::div/div` )[4];
            await trashIcon.click();
            await browser.pause(INTERACTION_TIMEOUT);   
            await deleteFilterPopupPage.clickDeleteFilterButton();    
            await browser.pause(INTERACTION_TIMEOUT);        
        } else {
            console.log ( `FILTER ${value} HAVE NOT FOUND.` );
        }
    }
    
}