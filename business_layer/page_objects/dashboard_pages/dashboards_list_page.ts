import { _ecx } from "../../../core_layer/utilities/aliases"

export class DashboardsListPage {
    public clickDashboard = async ( value : string ) : Promise <void> => {
        await _ecx ( `//a[text()='${value}' and contains(@class,'gridCell')]` );
    }
}