import Helpers from "./Helpers";
import {expect} from "@wdio/globals";

class Checkers extends Helpers {
    public async checkIfElementVisible(locator: string) {
        return (await this.getElement(locator)).isDisplayed();
    }
}

export default new Checkers()