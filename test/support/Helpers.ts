import { $ } from '@wdio/globals'

export default class Helpers {
    public async log(text: string) {
        console.log(text);
    }

    public async pause(miliseconds: number) {
        await browser.pause(miliseconds);
    }

    public async getElement(locator: string, timeout: number = 5000) {
        //dedicated method for getting elements
        //timeout can be parametrized
        //using additional logging
        await this.log(`Getting Element: \x1b[1m${locator}\x1b[0m`); //bolded locator
        const element = await $(locator);
        //can add here some conditions like element exists
        await element.waitForExist({timeout});
        return element;
    }

    public async click(locator: string) {
        //our wrapper for click method
        const el = await this.getElement(locator);
        //using additional logging
        await this.log('Clicking Element: ' + locator);
        await el.click();
        //we could add here additional waiting for spinners if needed
    }

    public async clickWithScroll(accessibilityId: string, howManySwipes: number = 2) {
        // Scroll to the element using accessibility ID strategy
        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: accessibilityId,
            maxSwipes: howManySwipes
        });

        const el = await $(`~${accessibilityId}`);
        await el.waitForExist({ timeout: 5000 });
        await el.waitForDisplayed({ timeout: 5000 });

        await this.log(`Clicking Element: ${accessibilityId}`);
        await el.click(); // or use touchAction if click fails
    }


    public async typeInText(locator: string, value: string) {
        //our wrapper for setValue method
        const el = await this.getElement(locator);
        //we could add here additional clear input field if needed
        //using additional logging
        await this.log('Clear element: ' + locator + ' & Type text: ' + value);
        await el.clearValue();
        await el.setValue(value);
    }
}