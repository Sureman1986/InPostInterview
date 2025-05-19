# InPostInterview Guidelines
1. Ensure you have Android Emulator with Android 16 properly configured
2. Perform NPM install
3. Go to .env file and update APK path because it is an absolute path
4. In .env update EMULATOR_NAME with your own (**adb devices** command to get names)
5. Run Appium: npx Appium
6. Run tests: npm test

# General explanations:
* Test data is stored in: **test/testData**
* Helpers and Checkers methods are stored in: **test/support**
* APK is stored in: **apk/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk**
* Mocha was used as a framework
* tsconfig.json was added for handing various features and modules for TS
* .env file was added to store **process.env**
* Xpaths are the main locator type
* There are two tests inside **test.e2e.ts** spec:
  * First is for Login in and validating welcome page
  * Second is the **InPost's Required Test Flow**
### All Advanced and Optional tasks were implemented


Other usefull commands:
- netstat -ano | findstr :4723
- taskkill /PID 12345 /F