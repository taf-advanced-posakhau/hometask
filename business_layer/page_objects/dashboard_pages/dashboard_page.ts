import { INTERACTION_TIMEOUT } from "../../../core_layer/constants/constants";
import { REPORTPORTAL_LOCATORS } from "../../../core_layer/constants/locators";
import { assertEqualValues } from "../../../core_layer/utilities/assertions";

export class DashboardPage {

    private positionParameterArray;
    private movableElementPositionBeforeMovement;
    private movableElementPositionAfterMovement;

    public getPositionBeforeResizing = async () : Promise <void> => {
        this.positionParameterArray = ( await $(REPORTPORTAL_LOCATORS.dashboard.movableWidget).getAttribute('style') ).split(';')
        this.movableElementPositionBeforeMovement = this.positionParameterArray[4];
        console.log(`Translation point before movement: ${this.movableElementPositionBeforeMovement}`);
    }

    public getPositionAfterResizing = async () : Promise <void> => {
        this.positionParameterArray = ( await $(REPORTPORTAL_LOCATORS.dashboard.movableWidget).getAttribute('style') ).split(';')
        this.movableElementPositionAfterMovement = this.positionParameterArray[4];
        console.log(`Translation point after movement: ${this.movableElementPositionAfterMovement}`);
    }

    public resizeWidget = async ( xPos : number , yPos : number ) : Promise <void> => {
        console.log (`RECEIVED COORDINATES FOR DRAG AND DROP : XPOS: ${xPos} YPOS: ${yPos}`)
        let resizingElementPointer = await $ ( REPORTPORTAL_LOCATORS.dashboard.resizeableWidgetPointer );
        await resizingElementPointer.dragAndDrop({x:100,y:100});        
        await browser.pause (INTERACTION_TIMEOUT*4);
    }

    public assertMovement = async () : Promise <void> => {
        await assertEqualValues ( ( this.movableElementPositionBeforeMovement != this.movableElementPositionAfterMovement ) , true );
    }

    public resizeWidgetBack = async ( xPos : number , yPos : number ) : Promise <void> => {
        console.log (`RECEIVED COORDINATES FOR DRAG AND DROP : XPOS: ${xPos} YPOS: ${yPos}`)
        let resizingElementPointer = await $ ( REPORTPORTAL_LOCATORS.dashboard.resizeableWidgetPointer );
        await resizingElementPointer.dragAndDrop({x:-100,y:-100});
        await browser.pause (INTERACTION_TIMEOUT*4);
    }

}