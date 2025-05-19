import Page from "./page";
import Checkers from "../support/Checkers";
import {format} from "util";
import {expect} from "@wdio/globals";

interface Product {
    name: string;
    description: string;
    price: string;
}
interface Address {
    firstName: string;
    lastName: string;
    zipPostal: string;
}


class CartPage extends Page {
    public async goToCart() {
        await this.click(this.topCart);
    }

    public async returnCartQuantity() {
        const el = await this.getElement(this.topCartQuantityXpath);
        return el.getText();
    }

    public async validateProductInTheCart(product: Product) {
        await Checkers.checkIfElementVisible(format(this.cartItemDescriptionByProductName, product.name, product.description));
    }

    public async removeItemFromCart(product: Product) {
        await this.click(format(this.removeCartItemByProductNameBtn, product.name));
    }

    public async checkoutCart(address: Address, products: Product[]) {
        await this.click(this.topCart);
        await this.click(this.checkoutBtn);
        await this.typeInText(this.firstNameInpt, address.firstName);
        await this.typeInText(this.lastNameInpt, address.lastName);
        await this.typeInText(this.zipPostalInpt, address.zipPostal);
        await this.click(this.continueBtn);
        await this.verifyCheckOutOverviewAndFinish(products)
    }

    private async verifyCheckOutOverviewAndFinish(products: Product[]) {
        products.forEach((cartItem) => {
            Checkers.checkIfElementVisible(format(this.cartItemDescriptionByProductName, cartItem.name, cartItem.description));
        })
        await this.clickWithScroll(this.finishBtn, 1);
    }

    public async validateFinishPageAndGoHome() {
        await expect(Checkers.checkIfElementVisible(this.checkoutComplete)).toBeTruthy();
        await expect(Checkers.checkIfElementVisible(this.thxForYourOrderTxt)).toBeTruthy();
        await expect(Checkers.checkIfElementVisible(this.finishImage)).toBeTruthy();
        await this.click(this.backHomeBtn);
    }

    public async verifyCheckoutInformationPage() {
        await this.click(this.topCart);
        await this.click(this.checkoutBtn);
        //verify empty First Name
        await this.click(this.continueBtn);
        await Checkers.checkIfElementVisible(format(this.errorMessageByText, 'First Name is required'));
        await this.typeInText(this.firstNameInpt, 'Test FirstName');
        //verify empty Last Name
        await this.click(this.continueBtn);
        await Checkers.checkIfElementVisible(format(this.errorMessageByText, 'Last Name is required'));
        await this.typeInText(this.lastNameInpt, 'Test LastName');
        //verify empty Zip
        await this.click(this.continueBtn);
        await Checkers.checkIfElementVisible(format(this.errorMessageByText, 'Postal Code is required'));
        await this.click(this.cancelbtn);
    }

    private topCart = '//android.view.ViewGroup[@content-desc="test-Cart"]';
    private topCartQuantityXpath= this.topCart + '//android.widget.TextView';
    private cartItemByProductName = '//android.widget.TextView[@text="%s"]';
    private cartItemDescriptionByProductName = this.cartItemByProductName + '/following-sibling::android.widget.TextView[@text="%s"]';
    private removeCartItemByProductNameBtn = '//android.view.ViewGroup[@content-desc="test-Item"][.//android.widget.TextView[@text="%s"]]//android.view.ViewGroup[@content-desc="test-REMOVE"]';
    private checkoutBtn = '//android.view.ViewGroup[@content-desc="test-CHECKOUT"]';
    private firstNameInpt = '//android.widget.EditText[@content-desc="test-First Name"]';
    private lastNameInpt = '//android.widget.EditText[@content-desc="test-Last Name"]';
    private zipPostalInpt = '//android.widget.EditText[@content-desc="test-Zip/Postal Code"]';
    private continueBtn = '//android.widget.TextView[@text="CONTINUE"]';
    private cancelbtn ='//android.view.ViewGroup[@content-desc="test-CANCEL"]';
    private errorMessageByText = '//android.widget.TextView[@text="%s"]';
    private finishBtn = 'test-FINISH';
    private checkoutComplete = '//android.widget.ScrollView[@content-desc="test-CHECKOUT: COMPLETE!"]'
    private thxForYourOrderTxt= '//android.widget.TextView[@text="THANK YOU FOR YOU ORDER"]';
    private finishImage= '//android.widget.ScrollView[@content-desc="test-CHECKOUT: COMPLETE!"]/android.view.ViewGroup/android.widget.ImageView'
    private backHomeBtn = '//android.view.ViewGroup[@content-desc="test-BACK HOME"]'
}

export default new CartPage();