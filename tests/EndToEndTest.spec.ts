import {test,expect,Page} from '@playwright/test';

import {HomePage} from   '../pages/HomePage';
import {Register} from   '../pages/RegisterPage';
import {TestConfig} from  '../test.config';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import {DataProvider} from  '../utils/dataProvider';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
import {MyAccountPage} from   '../pages/MyAccountPage';
import { ProductP } from '../pages/Productp';
import { LogoutPage } from '../pages/LogoutPage';

import {SearchPage} from '../pages/SearchPage';

let  homep:HomePage;
test('execute end to end test case',{tag:['@end-to-end']},async ({page})=>{
    

     await page.goto(TestConfig.appUrl);
     let registermail=await PerformUserRegisteration(page);
     console.log(`registered email is ${registermail}`)

     console.log('>>>Registeration is complete>>>>>');

     await LogoutApplication(page);

     console.log('>>>Logout is complete>>>>>');


     await performLogin(page,registermail);

     console.log('>>>Login is complete>>>>>');


     await addProductToCart(page);

      console.log('>>>addtoCart is complete>>>>>');










})
async function PerformUserRegisteration(page:Page):Promise<string>{
    
    //user is on home page 
    homep = new HomePage(page);

    await  homep.clickMyAccount();
    await  homep.clickRegister();
    const regp= new Register(page);
    const firsname=RandomDataUtil.getFirstName();
    const lstname =RandomDataUtil.getlastName();
    const  email=RandomDataUtil.getEmail();
    const telephone=RandomDataUtil.getPhoneNumber();
    const password=TestConfig.password;
    const conpassword=TestConfig.password;
    await regp.CreatRegisterPage(firsname,lstname,email,telephone,password,conpassword);
    await regp.clickCheckBox();
    await regp.clickContinue();
    const cofimsg=await regp.getConfirmMessage();
    expect(cofimsg).toContain('Your Account Has Been Created!');
    return email;
}

async function LogoutApplication(page:Page) {
    //samban@gmail.com   test@123
    const logoutp= new LogoutPage(page);
     
     expect(await logoutp.isContinueButtonVisible()).toBeTruthy();

      homep = await   logoutp.clickContinue();

      expect(await homep.isHomePageExists()).toBe(true);

    
}

async function performLogin(page:Page,email:string) {

    await page.goto(TestConfig.appUrl);
    //await page.waitForTimeout(5000);
    const homep = new HomePage(page);
    const myaccp= new MyAccountPage(page);
     await homep.clickMyAccount();
    await myaccp.clickLogoutPage();
    await page.waitForLoadState('domcontentloaded');
    //await homep.clickMyAccount();
   // await myaccp.clickLogoutPage();
    await homep.clickMyAccount();
   //
    await page.waitForTimeout(5000);
    await homep.clickLogin();
    const loginp= new LoginPage(page);
    const pass= TestConfig.password;
    await loginp.enterUserNamePassword(email,pass);
    await loginp.clickLoginPage();
    const accexist= await loginp.myAccountPage();
    expect(accexist).toContain('My Account');
         
    
}

async function addProductToCart(page:Page) {


     await  homep.clickSearchBox(TestConfig.productName);
         await homep.clickSearch();
         const searchp= new SearchPage(page);
         const productP=new ProductP(page);
           expect(await searchp.isSearchResultPageExists()).toBeTruthy();
     
          const hm=await searchp.isSearchProduct(TestConfig.productName)
          expect(hm).toBeTruthy();
     
          if(await searchp.isSearchProduct(TestConfig.productName))
          {
     
             await  searchp.selectProduct(TestConfig.productName);
             await page.waitForLoadState('domcontentloaded');
             await  productP.selectQuantity(TestConfig.productQuantity)
             await  productP.addCurrentProduct();
             expect(await productP.checkProductconfirmMessage()).toBeTruthy();
     
             await productP.clickToViewCart();
     
     
          }
    
}