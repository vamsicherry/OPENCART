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
test('user registeration page',{tag:['@sanity','@regression','@master']},async ({page})=>{

     

     expect(homep.isHomePageExists).toBeTruthy();

     await homep.clickMyAccount();
     await homep.clickRegister();

     
     const firstname= RandomDataUtil.getFirstName();
     const lastname=  RandomDataUtil.getlastName();
     const email=RandomDataUtil.getEmail();
     const telephone=RandomDataUtil.getPhoneNumber();
     const password=RandomDataUtil.getPassword();

     //const confpass=RandomDataUtil.getPassword();

     await regp.CreatRegisterPage(firstname,lastname,email,telephone,password,password);
     await regp.clickCheckBox();
     await  regp.clickContinue();

     const messg=await regp.getConfirmMessage();
     expect(messg).toContain('Your Account Has Been Created!');

     


})


