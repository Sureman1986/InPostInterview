import Page from "./page";
import { expect } from '@wdio/globals'
import Checkers from "../support/Checkers";
import { format } from 'util';

interface Product {
    name: string;
    description: string;
    price: string;
}

class ProductsPage extends Page {
     public async validateProductPage() {
         //validate products page content
         await expect(Checkers.checkIfElementVisible(this.productsSection)).toBeTruthy();
         await expect(Checkers.checkIfElementVisible(this.productFilter)).toBeTruthy();
         await expect(Checkers.checkIfElementVisible(this.productToggle)).toBeTruthy();
    }

    public async checkIfProductVisible(product: Product) {
        await expect(Checkers.checkIfElementVisible(format(this.productItemByName, product.name))).toBeTruthy();
    }

    public async addToCart(product: Product) {
        await this.click(format(this.addToCartProductByName, product.name));
    }

    public async filterBy(filterOption: string) {
        //available options: "Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"
        await this.click(this.productFilter);
        await this.click(format(this.productFilterOptionByText, filterOption));
    }

    /**
     * defined selectors as private variables
     */
    private productsSection  = '//android.widget.ScrollView[@content-desc="test-PRODUCTS"]';
    private productFilter= '//android.view.ViewGroup[@content-desc="test-Modal Selector Button"]';
    private productToggle= '//android.view.ViewGroup[@content-desc="test-Toggle"]';
    private productItemByName= '//android.widget.TextView[@content-desc="test-Item title" and @text="%s"]';
    private addToCartProductByName= this.productItemByName + '/following-sibling::android.view.ViewGroup[@content-desc="test-ADD TO CART"]';
    private productFilterOptionByText= '//android.widget.TextView[@text="%s"]';
}

export default new ProductsPage();