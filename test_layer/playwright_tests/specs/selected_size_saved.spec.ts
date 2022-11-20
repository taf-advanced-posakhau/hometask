import { test, expect } from '@playwright/test';
import { REPORTPORTAL_LOCATORS } from '../../../core_layer/constants/locators';
import { INTERACTION_TIMEOUT } from '../../../core_layer/constants/constants';

test.use({ viewport: { width: 1920, height: 1080 } });
test('selected size of the draggable widget is saved after resizing', async ({ page }) => {

  let draggableElementWidthBeforeDrag;
  let draggableElementHeightBeforeDrag;

  let draggableElementWidthAfterDrag;
  let draggableElementHeightAfterDrag;

  await page.goto('localhost:8080/');

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// begin login procedure
  await page.locator(REPORTPORTAL_LOCATORS.login.username).fill('default');
  await page.locator(REPORTPORTAL_LOCATORS.login.password).fill('1q2w3e');
  await page.locator(REPORTPORTAL_LOCATORS.login.loginButton).click();
  await delay(INTERACTION_TIMEOUT);

//navigating to correct user profile
await page.goto('http://localhost:8080/ui/#default_personal/dashboard');
await delay(INTERACTION_TIMEOUT);

//opening dashboard for hometask
await page.locator(`//a[text()='hometask-06-ui' and contains(@class,'gridCell')]`).click();
await delay(INTERACTION_TIMEOUT);

//getting draggable element width and height before dragging
let sizeParametersArray = ( await page.locator(`//div[text()='draggable_468']/parent::div/parent::div/parent::div/parent::div/parent::div/parent::div`).getAttribute('style') ).split(';')
draggableElementWidthBeforeDrag = sizeParametersArray[0];
draggableElementHeightBeforeDrag = sizeParametersArray[1];
console.log (`Parameters of the element before drag: ${sizeParametersArray[0]} ${sizeParametersArray[1] }`);

//performing drag and drop
await page.dragAndDrop(REPORTPORTAL_LOCATORS.dashboard.draggableElement, REPORTPORTAL_LOCATORS.dashboard.targetElement, {targetPosition: { x: 700, y: 250 },});
await delay(INTERACTION_TIMEOUT);

//getting draggable element width and height after dragging
sizeParametersArray = ( await page.locator(`//div[text()='draggable_468']/parent::div/parent::div/parent::div/parent::div/parent::div/parent::div`).getAttribute('style') ).split(';')
draggableElementWidthAfterDrag = sizeParametersArray[0];
draggableElementHeightAfterDrag = sizeParametersArray[1];

console.log (`Parameters of the element after drag: ${sizeParametersArray[0]} ${sizeParametersArray[1] }`);

//Assertion of width and height of the draggable element after drag
if ( (draggableElementWidthBeforeDrag==draggableElementWidthAfterDrag) ) {} else {
    throw new Error ( `Width of the element before drag ${draggableElementWidthBeforeDrag} is not equal to width of the element after drag ${draggableElementWidthAfterDrag}` );
}

if ( (draggableElementHeightBeforeDrag==draggableElementHeightAfterDrag) ) {} else {
    throw new Error ( `Width of the element before drag ${draggableElementHeightBeforeDrag} is not equal to width of the element after drag ${draggableElementHeightAfterDrag}` );
}

//dragging draggable element back home
await page.dragAndDrop(REPORTPORTAL_LOCATORS.dashboard.draggableElement, REPORTPORTAL_LOCATORS.dashboard.targetElement, {targetPosition: { x: 200, y: 50 },});
await delay(INTERACTION_TIMEOUT);

});