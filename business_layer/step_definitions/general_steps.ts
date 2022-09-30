import { primary_url } from "../../core_layer/constants/constants";
import { Then, When } from '../../node_modules/@wdio/cucumber-framework/build/index';

When(/^browser navigated to primary url$/, async () => {
    await browser.url(primary_url);
    await browser.pause(15 * 1000);
});

