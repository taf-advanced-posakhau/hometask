import { test, expect, selectors } from '@playwright/test';
import { REPORTPORTAL_LOCATORS } from '../../../core_layer/constants/locators';
import { INTERACTION_TIMEOUT } from '../../../core_layer/constants/constants';
import { yellow } from 'colors';

test.use({ viewport: { width: 1920, height: 1080 } });
test('Verification is element into view', async ({ page }) => {

  // page.on(`request`, req => console.log(yellow(`request interception stream >>>>${req.method} ${req.response} ${req.postDataBuffer} ${req.url} ${req.headerValue} ${req.postData} `)));

  // await page.route('**/*',route => {
  //   console.log(route.request().url())
  //   return route.continue();
  // })

  

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

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// verifying that "Add new vidget" button is into view - by JavaScript
let elementXpath = `//span[text()='Add new widget']/parent::button`;

let isElementIntoView = await page.evaluate(elementXpath => {
  var element = document.evaluate(elementXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log(element);
  var position = element.getBoundingClientRect();
 
  if (position.top >= 0 && position.bottom <= window.innerHeight) {      
      return true;
  } else return false;
}, elementXpath);

if (isElementIntoView!= true ) {
  throw new Error (`Element is not into view or not completely into view`);
}

// verifying that "Add new vidget" button is into view - by Playwright
await expect(page.locator(elementXpath)).toBeVisible()

await delay(INTERACTION_TIMEOUT*4);

});