import LoginPage from '../pageobjects/login.page'
import ProductsPage from '../pageobjects/products.page'
import CartPage from '../pageobjects/cart.page'
import users from '../testData/users.json';
import products from '../testData/products.json';
import addresses from '../testData/address.json';
import Helpers from "../support/Helpers";
import {expect} from "@wdio/globals";
import Checkers from "../support/Checkers";
const helpers = new Helpers();

//here we are getting desired user basing on env. on which we are testing
const testEnv = process.env.TEST_ENV;
const user = users[testEnv].standardUser;

describe('Sauce Lab Purchase Flow', () => {
    it('Login with valid credentials and check Products page', async () => {
        await LoginPage.login(user.username, user.password);
        await ProductsPage.validateProductPage();
    });

    it('Add products to the Cart, validate and purchase', async () => {
        await ProductsPage.addToCart(products.SauceLabsBackpack);
        await ProductsPage.addToCart(products.SauceLabsBikeLight);
        //validate cart items count
        expect(await CartPage.returnCartQuantity()).toEqual("2");
        //filter Z to A: last product now should be at the top, check it
        helpers.log('STARTING FILTER VALIDATION');
        await ProductsPage.filterBy('Name (Z to A)');
        await ProductsPage.checkIfProductVisible(products.SauceLabsOnesie);
        //validate cart items
        await CartPage.goToCart();
        helpers.log('STARTING CART VALIDATING');
        await CartPage.validateProductInTheCart(products.SauceLabsBackpack);
        await CartPage.validateProductInTheCart(products.SauceLabsBikeLight);
        //remove one item from cart and validate
        await CartPage.removeItemFromCart(products.SauceLabsBackpack);
        expect(await CartPage.returnCartQuantity()).toEqual("1");
        //verify empty address error messages
        helpers.log('STARTING CHECKOUT VALIDATING');
        await CartPage.verifyCheckoutInformationPage();
        //checkout
        await CartPage.checkoutCart(addresses.LeszekAddress, [products.SauceLabsBikeLight]);
        await CartPage.validateFinishPageAndGoHome();
        //Check if after clicking Back Home button, user was navigated to products page
        await ProductsPage.validateProductPage();
    });
});

