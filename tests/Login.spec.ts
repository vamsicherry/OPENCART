
import {test,expect} from '@playwright/test';

import {HomePage} from   '../pages/HomePage';
import {Register} from   '../pages/RegisterPage';
import {TestConfig} from  '../test.config';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import {DataProvider} from  '../utils/dataProvider';
import { LoginPage } from '../pages/LoginPage';
let homep:HomePage;
let regp:Register;
let loginp:LoginPage;
test.beforeEach('before each',async({page})=>{

     await page.goto(TestConfig.appUrl);

      homep= new HomePage(page);
      regp= new Register(page);
      loginp=new LoginPage(page);

})

test.afterEach('after each',async({page})=>{
     await page.waitForTimeout(3000);
     await page.close();
})


test('user login page',{tag:['@sanity','@regression','@master']},async({page})=>{

     await homep.clickMyAccount();
     await homep.clickLogin();

     await loginp.enterUserNamePassword(TestConfig.email,TestConfig.password);
     await loginp.clickLoginPage();

     const accexist= await loginp.myAccountPage();
      expect(accexist).toContain('My Account');
     

})