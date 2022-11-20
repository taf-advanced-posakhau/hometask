import { test, expect, selectors } from '@playwright/test';
import { REPORTPORTAL_LOCATORS } from '../../../core_layer/constants/locators';
import { INTERACTION_TIMEOUT } from '../../../core_layer/constants/constants';

test.use({ viewport: { width: 1920, height: 1080 } });
test('Widget content resizes while resizing the widget', async ({ page }) => {

  let movableContentElementHeightBeforeMovement;
  let movableContentElementHeightAfterMovement;

// go to primary url
  await page.goto('localhost:8080/');

//implement timeout function
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

//obtaining position property for the widget which should move when another widget be resized
let contentElementHeightArray = ( await page.locator(REPORTPORTAL_LOCATORS.dashboard.sizeableContentElement).getAttribute('style') ).split(';')
movableContentElementHeightBeforeMovement = contentElementHeightArray[0];
console.log(`Content element height before movement: ${movableContentElementHeightBeforeMovement}`);

//performing resizing of the widget
await page.dragAndDrop(REPORTPORTAL_LOCATORS.dashboard.resizeableWidgetPointer, REPORTPORTAL_LOCATORS.dashboard.targetElement, {targetPosition: { x: 500, y: 800 },});
await delay(INTERACTION_TIMEOUT*4);

//obtaining position property after moving the widget which should move when another widget be resized
contentElementHeightArray = ( await page.locator(REPORTPORTAL_LOCATORS.dashboard.sizeableContentElement).getAttribute('style') ).split(';')
movableContentElementHeightAfterMovement = contentElementHeightArray[0];
console.log(`Content element height after movement: ${movableContentElementHeightAfterMovement}`);

//Assertion of translation points of the movable element after drag
if ( (movableContentElementHeightBeforeMovement!=movableContentElementHeightAfterMovement) ) {} else {
    throw new Error ( `Content element height before movement ${movableContentElementHeightBeforeMovement} is equal to content element height after movement ${movableContentElementHeightAfterMovement} - it seems there were no scaling for this element in all.`, );
}

//resizing widget back
await page.dragAndDrop(REPORTPORTAL_LOCATORS.dashboard.resizeableWidgetPointer, REPORTPORTAL_LOCATORS.dashboard.targetElement, {targetPosition: { x: 100, y: 350 },});
await delay(INTERACTION_TIMEOUT*4);

});