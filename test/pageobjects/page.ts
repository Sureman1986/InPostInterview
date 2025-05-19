import { browser } from '@wdio/globals'
import Helpers from "../support/Helpers";
import { expect } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page extends Helpers {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        // @ts-ignore
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }
}
