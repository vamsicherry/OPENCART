import {test,expect} from '@playwright/test';

import {HomePage} from   '../pages/HomePage';
import {Register} from   '../pages/RegisterPage';
import {TestConfig} from  '../test.config';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import {DataProvider} from  '../utils/dataProvider';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
import {MyAccountPage} from   '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';

let loginp:LoginPage;
let  homep:HomePage;
let  myaccp:MyAccountPage;
let  logoutp:LogoutPage;

test.beforeEach('before each',async ({page})=>{

    loginp=new LoginPage(page);
    homep= new HomePage(page);
    myaccp= new MyAccountPage(page);
    logoutp= new LogoutPage(page);


})

test.afterEach('after each',async({page})=>{
     await page.waitForTimeout(3000);
     await page.close();
})


test('user log out page',{tag:['@master','@sanity']},async ({page})=>{

      page.goto(TestConfig.appUrl);

      //go to home page 
      await homep.clickMyAccount();
      await homep.clickLogin();
      await loginp.enterUserNamePassword(TestConfig.email,TestConfig.password);
      await loginp.clickLoginPage();
      const myaccexist=await loginp.myAccountPage();
      expect(myaccexist).toContain('My Account');
      await homep.clickMyAccount();
      logoutp= await myaccp.clickLogoutPage();
      const visible=await logoutp.isContinueButtonVisible();
      expect(visible).toBeTruthy();

      //
      homep= await logoutp.clickContinue();
      expect(await homep.isHomePageExists()).toBe(true);
     
})