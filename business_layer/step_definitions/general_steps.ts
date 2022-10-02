import { INTERACTION_TIMEOUT, primary_url } from "../../core_layer/constants/constants";
import { waitCountdown } from "../../core_layer/utilities/core_actions";
import { Then, When } from '../../node_modules/@wdio/cucumber-framework/build/index';

When(/^browser navigated to primary url$/, async () => {
    await browser.url(primary_url);
    await browser.pause(5 * 1000);
});

Then(/^pause (.*) seconds$/, async (seconds: string) => {
    //console.log(`PAUSE ${seconds} SECONDS`)
    let secondsInt = parseInt(seconds.slice(1, -1));         // method slice(1,-1) remove the first and last character of a 'seconds' string
    waitCountdown(secondsInt);                              // because it have format like ' "number" ' (string in string)
    await browser.pause(INTERACTION_TIMEOUT * secondsInt);
});

When(/^browser navigated to "(.*)"$/, async ( value : string ) => {
    await browser.url( value );
    await browser.pause(5 * 1000);
});
