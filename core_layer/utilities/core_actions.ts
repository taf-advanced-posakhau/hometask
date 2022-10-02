/**
 * This page represents core actions such as click, send keys, get element text and so on.
 */

import { green, yellow, bgRed } from "../../node_modules/colors";
import { INTERACTION_TIMEOUT } from "../constants/constants";
import { _ex } from './aliases';
import { assertEqualValues } from "./assertions";



/**
 * This method found web-element by its xpath expression and perform mouse click on this element.
 * @param xpathExpression - xpath for particular web-element
 */
export const waitForElementAndClickByXpath = async (value: string): Promise<void> => {
    await browser.waitUntil(async () => await browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 60 * 1000, // 60 seconds
            timeoutMsg: 'Message on failure'
        }
    );
    const webElement = await $(value);
    //await browser.pause(INTERACTION_TIMEOUT * 2);
    await webElement.waitForDisplayed({ timeout: 15 * 1000 })
    await webElement.click();
    await browser.pause(INTERACTION_TIMEOUT);
}


/**
 * This method found web-elements by their xpath expression and perform mouse click on this elements.
 * @param xpathExpression - xpath for particular web-element
 */
export const waitForElementsAndClickByXpath = async (value: string): Promise<void> => {
    await browser.waitUntil(async () => await browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 60 * 1000, // 60 seconds
            timeoutMsg: 'Message on failure'
        }
    );
    const webElements = await $$(value);
    for (const el of webElements) {
        await el.waitForDisplayed({ timeout: 15 * 1000 });
        await el.click();
    }

}

/**
 * This method found web-element by its xpath expression and set some value into it.
 * @param xpathExpression - xpath for particular web-element
 * @param value - value to be insterted into current web-element
 */
export const waitForElementByXpathAndSendKeys = async (xpathExpression: string, value: string): Promise<void> => {
    await browser.pause(INTERACTION_TIMEOUT );
    const webElement = await $(xpathExpression);
    await webElement.setValue(value);
    await browser.pause(INTERACTION_TIMEOUT * 0.5 );
}

/**
 * This method found web-element by its xpath expression and returns it.
 * @param xpathExpression - xpath for particular web-element 
 */
export const waitForElementByXpath = async (xpathExpression: string): Promise<any> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    return await $(xpathExpression);
}

export const getElementTextByXpath = async (xpathExpression: string): Promise<string> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    await browser.waitUntil(async () => await browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 60 * 1000, // 60 seconds
            timeoutMsg: 'Message on failure'
        }
    );
    const webElement = await $(xpathExpression);
    return await webElement.getText();
}

export const getElementText = async (elem): Promise<string> => {
    return await elem.getText();
}

export const isElementDisplayedByXpath = async (xpathExpression: string): Promise<boolean> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    const webElement = await $(xpathExpression);
    await webElement.waitForDisplayed(INTERACTION_TIMEOUT);
    if (await webElement.isDisplayed()) {
        console.log(green(`VERIFYING IS ELEMENT DISPLAYED WITH XPATH ${xpathExpression} | STATUS : ${(await webElement.isDisplayed())}`));
    } else if (!(await webElement.isDisplayed())) {
        console.log(bgRed(yellow(`VERIFYING IS ELEMENT DISPLAYED WITH XPATH ${xpathExpression} | STATUS : ${(await webElement.isDisplayed())}`)));
    }

    console.log(`                                                        `);
    return await assertEqualValues((await webElement.isDisplayed()), true);
}

export const isElementAbsentOnPageByXpath = async (xpathExpression: string): Promise<boolean> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    const webElement = await $(xpathExpression);
    return !(await webElement.isExisting());
}

export const getAmountOfElementsByXpath = async (xpathExpression: string): Promise<number> => {
    await $(xpathExpression).waitForDisplayed();
    const elementsContainerArray = await $$(xpathExpression);
    return await elementsContainerArray.length;
}

export const checkElementsAreVisible = async (xpathExpression: string): Promise<any> => {
    const elementsContainerArray = await $$(xpathExpression);
    elementsContainerArray.forEach(async element => {
        return await assertEqualValues(await element.isDisplayed(), true);
    });
}

export const checkElementIsDisabledByXpath = async (xpathExpression: string): Promise<boolean> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    return !(await $(xpathExpression).isEnabled());
}

export const checkElementIsEnabledByXpath = async (xpathExpression: string): Promise<boolean> => {
    await browser.pause(INTERACTION_TIMEOUT * 0.5);
    return await $(xpathExpression).isEnabled();
}

export const getArrayOfValuesFromWebElements = async (value: string): Promise<any> => {
    const textValuesArray = [];
    const textValuesWebElementsContainer = await $$(value);
    const containerLength: number = (await textValuesWebElementsContainer).length;
    for (let i = 0; i < containerLength; ++i) {
        textValuesArray.push(await getElementText(await textValuesWebElementsContainer[i]));
    }
    return textValuesArray;
}

export const dragAndDropElement = async (draggableElement: any, areaToDrop: any): Promise<void> => {
    await draggableElement.dragAndDrop(areaToDrop);
}

export const isElementEnabled = async (elem: any): Promise<boolean> => {
    return await elem.isEnabled();
}

export const isElementEnabledByXpath = async (value: string): Promise<boolean> => {
    let el = await $(value);
    return await el.isEnabled();
}

export const isCheckboxSelectedByXpath = async (value: string): Promise<boolean> => {
    let el = await $(value);
    if (await el.isSelected()) {
        console.log(green(`VERIFYING IS CHECKBOX SELECTED WITH X-PATH ${value} : STATUS - ${await el.isSelected()}`));
    } else {
        console.log(bgRed(yellow((`VERIFYING IS CHECKBOX SELECTED WITH X-PATH ${value} : STATUS - ${await el.isSelected()}`))));
    }
    return await assertEqualValues((await el.isSelected()), true);
}

export const isCheckboxNotSelectedByXpath = async (value: string): Promise<boolean> => {
    let el = await $(value);
    if (!(await el.isSelected())) {
        console.log(green(`VERIFYING IS CHECKBOX NOT SELECTED WITH X-PATH ${value} : STATUS - ${!(await el.isSelected())} - CHECKBOX IS NOT SELECTED`));
    } else {
        console.log(bgRed(yellow((`VERIFYING IS CHECKBOX NOT SELECTED WITH X-PATH ${value} : STATUS - ${!(await el.isSelected())} - CHECKBOX IS SELECTED`))));
    }
    return await assertEqualValues((await el.isSelected()), false);
}

/**
 * This method countdowns to the job console how many seconds remains to wait due waiting procedure.
 * @param secondsToWait - amount of seconds to wait (incomes from general step)
 */
export const waitCountdown = (secondsToWait:number) => {
  secondsToWait = secondsToWait - 1;   
  function startTimer() {
    var countdownTimer = setInterval(function() {
        //console.log(secondsToWait);
        console.log( yellow("Waiting " + secondsToWait + " seconds\r") );
        secondsToWait = secondsToWait - 1;
        if (secondsToWait <= 0) {
            clearInterval(countdownTimer);
        }
    }, 1000);
}
startTimer(); 
}


