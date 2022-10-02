import { checkElementIsEnabledByXpath } from './core_actions';

import { 
    waitForElementAndClickByXpath,
     waitForElementByXpath,
     waitForElementByXpathAndSendKeys,
     getElementTextByXpath,
     isElementDisplayedByXpath,
     isElementAbsentOnPageByXpath,
     getAmountOfElementsByXpath,
     checkElementsAreVisible,           
     checkElementIsDisabledByXpath,
     isElementEnabled,
     getElementText,
     isCheckboxSelectedByXpath,
     isCheckboxNotSelectedByXpath
     } from './core_actions';


/**
 * This method is alias for waitForElementAndClickByXpath( xpathExpression ) - it find web-element by its xpath and performs click on it.
 * @param value - xpath of the particular web-element.
 */
export const _ecx = async (value: string): Promise<void> => {
    await waitForElementAndClickByXpath(value);
}

/**
 * This method is alias for waitForElementByXpathAndSendKeys( xpathExpression , value ) - it find web-element by its xpath and set value into it.
 * @param value - xpath of the particular web-element.
 */
export const _skx = async (xpathExpression: string, value: string): Promise<void> => {
    await waitForElementByXpathAndSendKeys(xpathExpression, value);
}


/**
 * This method is alias for getInputValueByXpath - it returns a value from input field by its xpath expression.
 * @param value - xpath expression
 * @returns value what stored into required input field
 */
export const _givx = async (value: string): Promise<string> => {
    return (await _ex(value)).getAttribute('value');
}

/**
 * This method is an alias of getElementTextByXpath(xpath expression) - it returns text which deposited inside web-element 
 * @param value - xpath of the element with text inside 
 * @returns string value with text within element with particular xpath
 */
export const _getx = async (value: string): Promise<string> => {
    return await getElementTextByXpath(value);
}

/**
 * This method is an alias of getElementText( web element ) - it returns text which deposited inside web-element 
 * @param value - xpath of the element with text inside 
 * @returns string value with text within element with particular xpath
 */
export const _get = async (value: any): Promise<string> => {
    return await getElementText(value);
}

/**
* Alias for element(by.xpath(`xpath-expression`))
* @param value - xpath of the web-element
*/
export const _ex = async (value: string): Promise<any> => {
    return await waitForElementByXpath(value);
}

/**
 * Alias for method isElementPresentWithTextInside(value:string) - verifies if any element with particular text inside it presents on current page
 * @param value - text what requires to be inside particular web-element
 * @returns assertion promise from chai at the root
 */
export const _is_epwt = async ( value : string) : Promise <any> => {
    return await isElementDisplayedByXpath ( `//*[contains(text(),"${value}")]` );
}

/**
 * Alias for method isElementPresentWithTextInsideByXpath(value:string) - verifies if any element with particular text inside it presents on current page
 * @param value - text what requires to be inside particular web-element
 * @returns assertion promise from chai at the root
 */
export const _is_epwtx = async (value: string): Promise<any> => {
    return await isElementDisplayedByXpath(`//*[contains(text(),'${value}')]`);
}

/**
 * This alias for method IsElementAbsentOnPageByXpath (xpath:string)
 * frequently in use in stesp where it needs to verify the absence of the element in some large list. 
 * @param value - xpath for element which absence needs to be verified
 * @returns Promise Assertion that sum of elements with this xpath at the current page is 0.
 */
export const _is_eapx = async (value: string): Promise<boolean> => {
    return await isElementAbsentOnPageByXpath(value);
}

/**
 * This method is alias for getAmountOfElementsByXpath (xpath : string) 
 * @param value - xpath expression of the elements which sum is need to count 
 * @returns number of elements with current xpath at the page
 */
export const _gaex = async (value: string): Promise<number> => {
    return await getAmountOfElementsByXpath(value);
}

/**
 * Alias for method checkElementIsVisibleByXpath (xpath : string)
 * @param value - xpath expression of the element
 * @returns Promise Assertion
 */
export const _is_evx = async (value: string): Promise<any> => {
    return await isElementDisplayedByXpath(await _ex(value));
}

/**
 * Alias for method isMultipleElementsVisibleByXpath (xpath : string)
 * @param value - xpath expression of the element
 * @returns Promise Assertion
 */
export const _is_mevx = async (value: any): Promise<boolean> => {
    return await checkElementsAreVisible(value);
}

/**
 * Alias for method isElementPresentByXpath ( xpath : string )
 * @param value - spath expression
 * @returns Promise assertion
 */
export const _is_epx = async (value: string): Promise<boolean> => {     
    return await isElementDisplayedByXpath(value);
}

/**
 * Alias for method isCheckboxSelectedByXpath ( xpathExpression )
 * @param value - xpath Expression
 * @returns boolean promise - TRUE IF SELECTED
 */
export const _is_csx = async (value: string): Promise <boolean> => {
    return await isCheckboxSelectedByXpath(value);
}

/**
 * Alias for method isCheckboxNotSelectedByXpath ( xpathExpression )
 * @param value - xpath Expression
 * @returns boolean promise - TRUE IF NOT SELECTED
 */
export const _is_cnsx = async (value: string): Promise<boolean> => {
    return await isCheckboxNotSelectedByXpath(value);
}

/**
 * Alias for method IsElementDisabledByXpath ( xpathExpression )
 * @param value - xpath
 * @returns string from native webdriverIO expect promise
 */
export const _is_edisabx = async (value: string): Promise<boolean> => {
    return await checkElementIsDisabledByXpath(value);
}

/**
 * Alias for method isElementEnabledByXpath ( xpathExpression )
 * @param value - xpath Expression
 * @returns boolean promise
 */
 export const _is_eex = async (value: string): Promise<boolean> => {
    return await checkElementIsEnabledByXpath ( value );
}

/**
 * Alias for method isElementDisplayedByXpath (xpathExpression)
 * @param value - xpath expression
 * @returns boolean promise
 */
export const _is_edsplx = async (value: string): Promise<boolean> => {
    return await isElementDisplayedByXpath(value);
}

/**
 * Alias for method isElementEnabled ( webElement )
 * @param el - web element ( await $ (xpath) )
 * @returns boolean promise
 */
export const _is_ee = async (el): Promise<boolean> => {
    return await isElementEnabled(el);
}
