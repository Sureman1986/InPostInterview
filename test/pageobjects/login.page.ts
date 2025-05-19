import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.typeInText(this.inputUsername, username);
        await this.typeInText(this.inputPassword, password);
        await this.click(this.btnLogin);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }

    /**
     * defined selectors as private variables
     */
    private inputUsername = '//android.widget.EditText[@content-desc="test-Username"]';
    private inputPassword = '//android.widget.EditText[@content-desc="test-Password"]';
    private btnLogin = '//android.view.ViewGroup[@content-desc="test-LOGIN"]';
}

export default new LoginPage();
